const AWS = require('aws-sdk')
const config = require('../config/config')


AWS.config.update({
    region: "ap-southeast-2",
    endpoint: config.dynamoUri,
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretKey
});
   
   
const docClient = new AWS.DynamoDB.DocumentClient();

const dynamo = new AWS.DynamoDB();

const params = {
    "TableName": "Pet"
}

docClient.scan(params, function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})