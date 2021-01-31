const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
var db = require('./connect');
const dotenv = require('dotenv');
dotenv.config();
var languages = require('./languages');

// Since we are calling the API from different locations by hitting endpoints in the browser. We also have to install the CORS middleware.
const cors = require('cors');
const textTranslate = require(`./languages`);

//What the body-parser middleware will be doing is grabbing the HTTP body, decoding the information, and appending it to the req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors());

var AWS = require("aws-sdk");
const SESConfig = {
    //apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY, 
    region: "us-east-1"
}
AWS.config.update(SESConfig);
var translate = new AWS.Translate();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to web server for translating your text." });
});

app.post('/translate', (req, res) => {

    let sourceLanguage = req.body.sourceLanguage;
    let targetLanguage = req.body.targetLanguage;
    var checkSql = `select translatedText from translations where inputText = "${req.body.message}" and  targetLang =  '${targetLanguage}' ;`;

    db.query(checkSql, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (result.length > 0) {
            console.log(result);
            return res.json({ message: result });
            // process.abort();
            //process.exit(1);
        } else {
            db.query(`select inputText from translations where  translatedText = "${req.body.message}" and  sourceLang =  '${targetLanguage}' ;`,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);

                    }
                    if (result.length > 0) {
                        // console.log("record2 matched");
                        found = true;
                        console.log(result);
                        return res.json({ message: result });
                        // process.exit(1);
                        //process.abort();
                    } else {
                        //  console.log("No record matched");
                        var params = {
                            SourceLanguageCode: languages.getCode(sourceLanguage),
                            TargetLanguageCode: languages.getCode(targetLanguage),
                            Text: req.body.message
                        };
                        translate.translateText(params, function(err, data) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                                return;
                            }
                            convertedText = data['TranslatedText'];
                            var sql = `insert into translations (inputText , sourceLang,  targetLang, translatedText) values ("${req.body.message}", '${sourceLanguage}',  '${targetLanguage}',  '${convertedText}' )`;
                            db.query(sql, function(err, result) {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                    return;
                                }
                                // console.log("record inserted");
                                console.log(convertedText);
                                return res.json({ message: convertedText });
                            });
                        });
                    }
                });
        }
    });
});

// set port, listen for requests
// app.listen(3000, () => {
//     console.log("Server is running on port 3000.");
// });

module.exports = app;
