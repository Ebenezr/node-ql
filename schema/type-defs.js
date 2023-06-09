const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    nationality: Nationality!
    friends: [User!]
    favoriteMovies: [Movie!]
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int!
    nationality: Nationality = KENYA
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }

  type Movie {
    id: ID!
    title: String!
    year: Int!
    rating: Float!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(title: String!): Movie!
  }

  enum Nationality {
    KENYA
    AMERICA
    UGANDA
  }
`;

module.exports = { typeDefs };
