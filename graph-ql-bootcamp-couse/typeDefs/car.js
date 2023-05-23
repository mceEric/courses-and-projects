const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    cars: [Car]!
    car(id: ID!): Car
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    color: String!
    owner: User!
  }

  extend type Mutation {
    createCar(make: String!, model: String!, color: String!, owner: ID): Car!
    removeCar(id: ID!): Boolean!
  }
`;
