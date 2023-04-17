import { gql } from '@apollo/client';

export const QUERY_WORKOUTS = gql` {
    workouts {
      _id
      category {
        _id
        name
      }
      description
    }
  }
`;

export const QUERY_WORKOUT_CATEGORIES = gql` {
    workoutCategories {
        _id
        name
      }
    }
`;

export const QUERY_USER = gql`{
  me {
    firstName
    lastName
    userWorkouts {
      _id
      type
      sets
      repetitions
      weight
      weightUom
      date
      warmup_cooldown
      workouts {
        _id
        category {
          name
        }
        description
      }
    }
    dates: userWorkouts {
      date
    
    }
  }
}
`;

