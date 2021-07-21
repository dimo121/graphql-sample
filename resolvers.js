module.exports = {
    Query: {
        pets(_,{ input },{ models }){
            return models.Pet.findMany(input)
        },
        pet(_,{ id },{ models }){
            return models.Pet.findOne(id)
        },
        user(_,{ id },{ models }){
            return models.User.findOne(id)
        },
        users(_,{ input },{ models }){
            return models.User.findMany(input)
        }
    },
    Mutation: {
        addPet(_, {input}, {models}){
            models.Pet.create({...input})
        },
        deletePet(_, { id }, {models}){
            return models.Pet.deletePet(id)
        }
    },
    Pet: {
        owner(pet,_,{ models }){
            return models.User.findOne(pet.owner)
        }
    },
    User: {
        pets(user,_, { models }){ //field specific resolver, property not in type user
            return models.Pet.findMany({owner : user.id})
        }
    }
}