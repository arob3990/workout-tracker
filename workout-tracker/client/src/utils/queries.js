import { gql } from '@apollo/client';

export const QUERY_WORKOUTS = gql`
{
    workouts {
        _id
        category
        description
    }
}
`;

export const QUERY_USER = gql`
{
    user{
        firstName
        lastName
        userWorkouts{
            _id
            type
            sets
            repetitions
            weight
            weightUom
            date
            warmup_cooldown
            workouts{
                _id
                category
                description
            }
        }
    }
}
`;