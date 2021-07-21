const createPetModel = require("./pet");
const createUserModel = require("./user");


module.exports = {
    models: {
        Pet: createPetModel(),
        User: createUserModel()
    }
}
/*
const params = {
    "TableName":"User",
    "Item" : {
                "id" : nanoid(),
                "username" : "Gerald",
        } 
};

docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to put:",
        JSON.stringify(err, null, 2));
    } else {
        console.log("PutItem succeeded:", data);
    }
});


const params = {
    RequestItems: {
    "User": [
        {
        "PutRequest": {
            "Item" : {
                "id" : nanoid(),
                "name" : "Bart",
                } 
            }
        },
        {
        "PutRequest": {
            "Item" : {
                "id" : nanoid(),
                "name" : "Olivia",
                } 
            }
        }
    ]
    }
};

dynamo.batchWriteItem(params, (err, res) => {
    if (err) {
        console.error("Unable to add batch. Error JSON:",
            JSON.stringify(err, null, 2));
    } else {
        console.log("Put item succeded: ",
            res);
    }
});

/*
const params = {
    TableName: "Pet",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType:"S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
 };


dynamo.createTable(params, (err,res) => {
    if(err){
        console.log('Unable to create table : ', JSON.stringify(err, null, 2));
    } else {
        console.log('Table created, description JSON : ', JSON.stringify(res, null, 2));
    }
});

/*
docClient.scan(params, (err,data) => {
    if(err){
        console.log(err)
    } else {
        console.log(data)
    }
})



/*

const dynamo = new AWS.DynamoDB();


const params = {
    TableName : "Worldbank",
    KeySchema: [
        { AttributeName: "indicator_id", KeyType: "HASH" }, //Hash key
        { AttributeName: "countryDate", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        { AttributeName: "indicator_id", AttributeType: "S" },
        { AttributeName: "countryDate", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamo.createTable(params, (err,res) => {
    if(err){
        console.log('Unable to create table : ', JSON.stringify(err, null, 2));
    } else {
        console.log('Table created, description JSON : ', JSON.stringify(res, null, 2));
    }
});

const indicator_id = 'SP.POP.TOTL';


const params = {
    TableName: "Worldbank",
    FilterExpression: "indicator_id = :this_id AND #an_year > :this_year ",
    ExpressionAttributeValues: { ":this_id" : indicator_id,
                                 ":this_year" : 2010 },
    ExpressionAttributeNames: { "#an_year" : "year" }
}

docClient.scan(params, (err,data) => {
    if(err){
        console.log(err)
    } else {
        console.log(data)
    }
})


*/



        // fs.writeFile('./database.json', data, 'utf8', (err) => {

        //     if (err) {
        //         console.log(`Error writing file: ${err}`);
        //     } else {
        //         console.log(`File is written successfully!`);
        //     }
        
        // });

        /*

        res.data[1].forEach((entry, key) => {
            
            const params = {
                "TableName" : "Worldbank",
                "Item" : {
                    "indicator_id" : entry.indicator.id,
                    "countryDate" : entry.countryiso3code+entry.date,
                    "country_name" : entry.country.value,
                    "year" : parseInt(entry.date),
                    "value" : entry.value,
                } 
            };c

            docClient.put(params, (err, res) => {
                if (err) {
                    console.error("Unable to add indicator ", entry.name, ". Error JSON:",
                        JSON.stringify(err, null, 2));
                } else {
                    console.log("Put item succeded: ",
                        res);
                }
            });
            
        })
        */
        //console.log(indicatorList);

/*

dynamo.deleteTable(params, (err,data) => {
    if(err){
        console.log(JSON.stringify(err,null,2));
    } else {
        console.log(JSON.stringify(data,null,2));
    }
});

*/
/*

dynamodb.createTable(params, function(err, data) {
    if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null,
    2));
    } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data,
    null, 2));
    }
});

/*
example of params with reserved name e.g. year is renamed in expressionattributenames

const params = {
    TableName: "Worldbank",
    FilterExpression: "#an_year = :this_year",
    ExpressionAttributeValues : {':this_year' : 2013},
    ExpressionAttributeNames : { '#an_year' : 'year'}
 };




//console.log("Importing movies into DynamoDB. Please wait.");

const allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));

allMovies.forEach(function(movie) {
 const params = {
    TableName: "Worldbank",
    Item: {
    "year": movie.year,
    "title": movie.title,
    "info": movie.info
    }
 };
    docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add movie", movie.title, ". Error JSON:",
        JSON.stringify(err, null, 2));
    } else {
        console.log("PutItem succeeded:", movie.title);
    }
 });
});


const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-southeast-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "randomKeyId",
    secretAccessKey: "secretKey"
});

const docClient = new AWS.DynamoDB.DocumentClient();

/*

const params = {
    
    TableName : "Worldbank",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH"}, //Partition key
        { AttributeName: "title", KeyType: "RANGE" } //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

// module.exports = dynamodb;

/*
  const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
 region: "ap-southeast-2",
 endpoint: "http://localhost:8000",
 accessKeyId: "randomKeyId",
 secretAccessKey: "secretKey"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: "Worldbank"
 };

docClient.scan(params, (err,data) => {
    if(err){
        console.log(err)
    } else {
        console.log(data)
    }
})

/*
example of params with reserved name e.g. year is renamed in expressionattributenames

const params = {
    TableName: "Worldbank",
    FilterExpression: "#an_year = :this_year",
    ExpressionAttributeValues : {':this_year' : 2013},
    ExpressionAttributeNames : { '#an_year' : 'year'}
 };

*/
