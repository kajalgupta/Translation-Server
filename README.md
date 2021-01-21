# Translation-Server
Nodejs webserver that exposes an API to translate a text

For more detail, please visit: 
[Build Node.js Rest APIs with Express & MySQL](https://bezkoder.com/node-js-rest-api-express-mysql/).
# Project setup
To get the Node server running locally:
- Clone this repo
- npm install to install all required dependencies
- "node start" to start the local server

Then visit http://localhost:3000/
![Running Server on port 3000 !](/assets/run.png "Server On")

NOTE: Do not forget to set IDs and SECRETs in.env file. 

# Setting up MySQL Database Connection 
![Database!](/assets/settingupDBconnection.png "db")

# Database Schema
![Database!](/assets/database.png "db")
- If you have initially declared inputText & translatedText column as varchar, convert them to utf-8 charset text type using the following 2 commands( as they will store multilingual text)
- ALTER TABLE MyTable MODIFY MyColumn BINARY
- ALTER TABLE MyTable MODIFY MyColumn TEXT CHARACTER SET utf8 COLLATE utf8_general_ci 
# Running tests
Testing through jest framework
testscript is stored in _test_ directory in translateText.spec.js
command - npm run test

![Testing Using Jest!](/assets/testingsnapshot.png "Tested")

# Translating Text 
- Open Postman(Chrome Extension)
- Set the request type as POST 
- Set the header as shown below ![Set header!](/assets/setHeader.png "Header set")
- In the body tag 
    - specify your source language, target language, and message which you want to translate
- Hit the Send Button


- If this message isn't stored in the mysql database then it will hit the AWS Translate API, as shown below and then this translated text will be stored in the cache to minimize the future response time.

![Snapshot!](/assets/hittingAWSTRANSLATEAPI.png "AWS TRANSLATE API")

- Next time, if you will hit this same above request, then you will notice difference in response time as this time it will be coming from cache(mysql db)
![Snapshot!](/assets/HittingCacheInsteadOfHittingTranslateApi.png "Hitting Cache")

# Further Improvements
- Can use redis with MySQL, or with a nosql database like mongodb would be a good choice for  faster response time
- Here the translation is done sentence by sentence, if it could be converted to 'word to word' then many of the translations would be saved.
