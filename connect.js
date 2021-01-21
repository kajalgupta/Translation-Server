let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    //console.log('Connected to the MySQL server.');
    connection.query("CREATE DATABASE IF NOT EXISTS languagetranslations", function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        // if (err) throw err;
        // console.log("Database created");
    });
    connection.query("use languagetranslations", function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //if (err) throw err;
        //  console.log("Using Database ");
    });
    var sql = "CREATE TABLE IF NOT EXISTS translations (inputText VARCHAR(255), sourceLang text, translatedText VARCHAR(255), targetLang text )";
    connection.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //if (err) throw err;
        //console.log("Table created");
    });
});

module.exports = connection;

/*
 1.
node connect.js by this ->
                    Connected to the MySQL server.
                    Database created
                    using db
                    creating table
*/