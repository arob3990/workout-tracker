import React, { createContext, useContext, useState } from 'react';
import createId from './createId';

const WorkoutContext = createContext();

export const useWorkoutContext = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([
        {
            id: 1,
            type: 'Weight Training',
            sets: 2,
            repetitions: 5,
            weight: 25,
            weightUom: 'LBS',
            category: 'Upper Body',
            description: 'Shoulder Press'
        },
        {
            id: 2,
            type: 'Weight Training',
            sets: 3,
            repetitions: 15,
            weight: 105,
            weightUom: 'LBS',
            category: 'Lower Body',
            description: 'Squat'
        }
    ]);

    // Function to add a workout
    const addWorkout = (workout) => {
        if(!workout.type) {
            return;
        }
        const id = createId(workout);

        const newWorkout = { ...workout, id};

        setWorkouts([...workouts, newWorkout])
    }
}