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

# Running tests
Testing through jest framework
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

