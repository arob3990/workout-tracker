const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    UserWorkouts: [UserWorkout]
  }

  type Workouts {
    _id: ID
    category: String
    description: String
  }

  type UserWorkouts {
    _id: ID
    type: String
    sets: Int
    repetitions: Int
    weight: Int
    weightUom: String
    date: String
    warmup_cooldown: String
    workouts: Workouts


  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    workouts: [Workout]
    me: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWorkout(userId: ID!, UserWorkout: String!): User
    removeWorkout(UserWorkout: String!): User
  }
`;

module.exports = typeDefs;
