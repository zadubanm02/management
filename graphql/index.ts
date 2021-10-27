import { makeExecutableSchema } from 'apollo-server'
import { readFileSync } from 'fs'
import { MONGOURI } from './config';
import { resolvers } from './src';
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import expressJwt from 'express-jwt';
import { ValidateSignature } from './src/utils/utils';
import cors from 'cors'

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(result => {
    console.log("Connected to db")
}).catch(error => console.log("Error", error))

const typeDefs = readFileSync('./schema.graphql', 'utf-8')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const corsOptions = {
    origin: '*'
}

async function startApolloServer(typeDefs, resolvers) {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        context: async ({ req }) => {
            const validate = await ValidateSignature(req)
            console.log("Validate", validate)
            if (validate) {
                return { user: validate }
            } else {
                return { message: "Not Authorized" }
            }
        }
    });

    await server.start();
    const app = express();



    server.applyMiddleware({
        app,
        path: '/'
    });

    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
}

startApolloServer(typeDefs, resolvers)




// const server = new ApolloServer({
//     schema: schema,
//     resolvers: resolvers,
//     // USE THIS FOR AUTHORIZATION
//     // CONTEXT.USER WILL BE AVAILABLE IN RESOLVERS IN CTX
//     // context: ({req}) => {
//     //     const token = req.headers.authorization ?? '';

//     //     // try to retrieve a user with the token
//     //     const user = getUser(token);
//     //     if (!user) throw new AuthenticationError('you must be logged in');
//     //     return {user}
//     // },
// });