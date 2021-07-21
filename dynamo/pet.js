const { nanoid } = require('nanoid')
const { dynamo, docClient } = require('./dynamo')

const createPetModel = () => {
    return {
        async findMany(filter){
            const params = {
                "TableName": "Pet"
            }

            let data;
            
            try{
                data = await docClient.scan(params).promise()
            } catch(err){
                console.log(err)
            }
            
            if(filter){
                if(filter.name){
                    data.Items = data.Items.filter(item => item.name === filter.name)
                }
                if(filter.type){
                    data.Items = data.Items.filter(item => item.type === filter.type)
                }
                if(filter.user){
                    data.Items = data.Items.filter(item => item.user === filter.user)
                }
                if(filter.owner){
                    data.Items = data.Items.filter(item => item.owner === filter.owner)
                }
            }
            
            return data.Items
        },
        async findOne(id){

            const params = {
                "ProjectionExpression": "id, createdAt, #type, #name, #owner",
                "TableName": "Pet",
                "Key": { 
                    "id": {
                       "S" : id 
                    }
                },
                "ExpressionAttributeNames": {"#type":"type", "#name":"name", "#owner":"owner"}
            }
            let data;
            
            try {
                data = await dynamo.getItem(params).promise()
            } catch(err){
                console.log(err)
            }
        
            //dynamodb return element needs post processing
            data.Item.name = data.Item.name.S
            data.Item.createdAt = data.Item.createdAt.N
            data.Item.id = data.Item.id.S 
            data.Item.type = data.Item.type.S
            data.Item.owner = data.Item.owner.S
        
            return data.Item
        },
        async create(pet) {
            //const newPet = {id:nanoid(), createdAt:Date.now(), ...pet}
            const params = {
                "TableName": "Pet",
                "Item": {
                    "id": nanoid(),
                    "createdAt": Date.now(),
                    "name": pet.name,
                    "type": pet.type,
                    "owner": pet.owner
                }
            }
            
            let result;

            await docClient.put(params, (err,data) => {
                if(err){
                    console.log('Unable to add item: ', JSON.stringify(err, null, 2))
                } else {
                    console.log('Item added succesfully: ', JSON.stringify(data, null, 2))
                    result = data
                }
            }).promise()
    
            return result
        },
        async deletePet(id){
            const params = {
                "TableName": "Pet",
                "Key": { 
                    "id": {
                       "S" : id 
                    }
                },
                "ReturnValues": "ALL_OLD"
            }

            let result = { 
                            name: '',
                            createdAt: 0,
                            id: '',
                            type: ''
                        };

            await dynamo.deleteItem(params, (err,data) => {
                if(err){
                    console.log('Unable to delete item: ', JSON.stringify(err, null, 2))
                } else {
                    if (!data["ConsumedCapacity"]){
                        console.log('Item deleted succesfully: ', JSON.stringify(data, null, 2))
                        //dynamo response item must be corrected
                        result.name = data.Attributes.name.S
                        result.createdAt = data.Attributes.createdAt.N
                        result.id = data.Attributes.id.S
                        result.type = data.Attributes.type.S
                    }else{
                        console.log('Item does not exist')
                    }
                }
            }).promise()

            return result
        }
    }
}

module.exports = createPetModel