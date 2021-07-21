const nanoid = require('nanoid')
const { dynamo, docClient } = require('./dynamo')

const createUserModel = () => {
    return {
        async findOne(id){
            const params = {
                "ProjectionExpression": "id, username",
                "TableName": "User",
                "Key": { 
                    "id": {
                       "S" : id 
                    }
                }
            }
            let data;
            
            try {
                data = await dynamo.getItem(params).promise()
            } catch(err){
                console.log(err)
            }
            console.log(data)
            //dynamodb return element needs post processing
            data.Item.username = data.Item.username.S
            data.Item.id = data.Item.id.S 
        
            return data.Item
        },
        async create(user) {
            const newUser = {id:nanoid(), createdAt:Date.now(), ...user}

            await calltoDynamo(newUser)

            return newUser
        },
        async findMany(filter){
            const params = {
                "TableName": "User"
            }

            let data;
            
            try{
                data = await docClient.scan(params).promise()
            } catch(err){
                console.log(err)
            }

            if(filter){
                if(filter.username){
                    data.Items = data.Items.filter(item => item.username === filter.username)
                }
            }
            
            return data.Items
        }
    }
}

module.exports = createUserModel