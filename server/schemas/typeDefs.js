const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID 
        username: String
        email: String
        savedBooks:[Book]
    }
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Auth {
        token: ID!
        user: User
    }

    input NewBook {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        me: User
    } 

    type Mutation {
        login(email: String!, password:String!): Auth 
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: NewBook!): User
        removeBook(bookId: String!): User
    }
    
`;

module.exports = typeDefs;