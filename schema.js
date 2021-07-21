const { gql } = require('apollo-server')

const typeDefs = gql`

    enum Animal {
        CAT
        DOG
    }

    type User {
        id: ID!
        username: String!
        pets: [Pet]!
    }

    type Pet {
        id: ID!
        createdAt: String!
        name: String!
        type: Animal
        owner: User
    }

    input PetInput {
        type: Animal
        name: String
    }

    input UserInput{
        username: String
    }

    type Query {
        user(id:ID!): User!
        users(input: UserInput): [User]!
        pets(input: PetInput): [Pet]!
        pet(id: ID!): Pet!
    }

    input NewPetInput {
        name: String!
        type: Animal!
        owner: ID!
    }

    type Mutation {
        addPet(input:NewPetInput!): Pet!
        deletePet(id:String!): Pet!
    }
`;

module.exports = typeDefs