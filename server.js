const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { models } = require('./dynamo/index')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context(){
        return { models }
    }
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
});