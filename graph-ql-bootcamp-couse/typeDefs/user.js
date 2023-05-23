const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    name: String!
    username: String!
    photo: String
    car: [Car]
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    makeUser(name: String!): User!
    removeUser(id: ID!): Boolean
    registerUser(name: String!, username: String!, password: String!): Boolean!
    loginUser(username: String!, password: String!): Token!
    uploadImage(filename: String!): String!
  }
`;
