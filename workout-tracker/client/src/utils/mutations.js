import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
mutation AddWorkout($userId: ID!, $userworkout: [UserWorkoutInput]) {
  addWorkout(userId: $userId, userworkout: $userworkout) {
    userWorkouts {
      _id
      date
      type
      sets
      repetitions
      workouts {
        _id
        category {
          _id
          name
        }
        description
      }
      weight
      weightUom
      warmup_cooldown
    }
  }
}
`
