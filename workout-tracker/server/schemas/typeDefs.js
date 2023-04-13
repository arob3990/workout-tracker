const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userWorkouts: [UserWorkouts]
  }

  type Workouts {
    _id: ID
    category: String
    description: String
  }

  input WorkoutInput {
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

  input UserWorkoutInput {
    user: String
    type: String
    sets: Int
    repetitions: Int
    weight: Int
    weightUom: String
    date: String
    warmup_cooldown: String
    

  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    workouts: [Workouts]
    me: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWorkout(userId: ID!, userworkout: [UserWorkoutInput]): User
    
  }
`;

module.exports = typeDefs;


