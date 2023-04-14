const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userWorkouts: [UserWorkouts]
  }

  type WorkoutCategories {
    _id: ID
    name: String
  }

  type Workouts {
    _id: ID
    description: String
    category: WorkoutCategories
  }

  input WorkoutInput {
    _id: ID
    
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
    workouts: ID

  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    workoutCategories: [WorkoutCategories]
    workouts(category: ID): [Workouts]
    workout(_id: ID!): Workouts
    me: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWorkout(userId: ID!, userworkout: [UserWorkoutInput]): User
    
  }
`;

module.exports = typeDefs;


