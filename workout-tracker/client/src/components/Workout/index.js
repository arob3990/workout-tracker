import React, { useState, useEffect, useRef } from "react";
// import { ADD_WORKOUT, SET_WORKOUT};
import DatePicker from "react-datepicker";
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_WORKOUT } from '../../utils/mutations'
import { QUERY_WORKOUTS, QUERY_WORKOUT_CATEGORIES } from '../../utils/queries'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Auth from '../../utils/auth';

// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

import "react-datepicker/dist/react-datepicker.css";
import NewWorkout from "../NewWorkout.js";

const Workout = ({userId}) => {
  
  const formReset = useRef(null)
  const [startDate, setStartDate] = useState(new Date());
  const [exercise, setExercise] = useState({})
  const [totalWorkout, setTotalWorkout] = useState([]);
  const [shouldReset, setShouldReset] = useState(false);
  const [warmup, setWarmup] = useState('');
  const [cooldown, setCooldown] = useState('');

  const [addCreateWorkout, { error }] = useMutation(ADD_WORKOUT)

  const { data: exerciseList } = useQuery(QUERY_WORKOUTS);

  const { data: exerciseCategory } = useQuery(QUERY_WORKOUT_CATEGORIES)
  // console.log(exerciseCategory)

  useEffect(()=> {
    setExercise({
        ...exercise, date: startDate, user: userId, type: "weight-training"
        //replace string with _id
    })
  },[startDate])

  if (Auth.loggedIn() ) {
    console.log("USER ID", Auth.getProfile().data._id);
    userId = Auth.getProfile().data._id
  }

  const addNewWorkout = (e) =>{
    e.preventDefault();
    setTotalWorkout([
        ...totalWorkout, exercise
    ])
    

    setExercise({date: exercise.date, user: userId, type: "weight-training"});
    console.log("setExercise:",exercise)
    setShouldReset(true);
 
    
  }

  console.log("payload to graphql:" ,userId, totalWorkout)

  const onSubmit = async (e) => {
    e.preventDefault();
    setTotalWorkout([
        ...totalWorkout, exercise, {type: "warmup", warmup_cooldown: warmup, date: startDate}, {type: "cooldown", warmup_cooldown: cooldown, date: startDate }
    ])

    let finalTotalWorkout = totalWorkout.map(wo=>{
      return{
        user:userId,
        repetitions:wo?.repetitions,
        sets:wo.sets,
        weight:wo.weight,
        weightUom:wo.weightUom,
        date:wo.date,
        workouts:wo?.workouts,
        type: wo.type
      }
    })
    if (Object.keys(exercise).length > 0) {
      finalTotalWorkout.push({
        user:userId,
        repetitions:exercise?.repetitions,
        sets:exercise.sets,
        weight:exercise.weight,
        weightUom:exercise.weightUom,
        date:exercise.date,
        workouts:exercise?.workouts,
        type:exercise.type
      })
    }
    finalTotalWorkout.push({user:userId,date:startDate,type: "warmup", warmup_cooldown: warmup})
    finalTotalWorkout.push({user:userId,date:startDate,type: "cooldown", warmup_cooldown: cooldown})

    try {
      console.log("TOTAL WORKOUT",totalWorkout)

      const data  = await addCreateWorkout({
        variables: { userId, userworkout:finalTotalWorkout }
      });

      // OLD const data  = await addCreateWorkout({
      //   variables: { userId, userworkout:totalWorkout }
      // });
      formReset.current.reset();
      setShouldReset(true);
    } catch (err) {
      console.error(err);
    }
    
  }

  // console.log(totalWorkout)

//   const onDropdownChange = (e) => {
//     e.preventDefault();
//     // console.log(e.target.value)
// }

const handleWorkoutComponentChange = (workoutComponentObjects) =>{
    setExercise({...exercise, ...workoutComponentObjects})
}

// const filteredExercises = exerciseList?.workouts
//   .filter(ex => {
//     return ex.category._id === exercise.category
//   })

  return (
    
    <Container>
    {Auth.loggedIn() ? (
    <Form validated={shouldReset} ref = {formReset}>
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Select Date</InputGroup.Text>
            <div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
      </InputGroup>
      
      <InputGroup>
        <InputGroup.Text>Warmup</InputGroup.Text>
        <Form.Control id = "warmup" placeholder="Enter in your warmup details" as="textarea" aria-label="Warmup"
        onChange = {(e)=>{
            const{value} = e.target
            setWarmup(value)
        }} />
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>Cooldown</InputGroup.Text>
        <Form.Control id = "cooldown" placeholder="Enter in your cooldown details" as="textarea" aria-label="Cooldown" 
        onChange = {(e)=>{
            const{value} = e.target
            setCooldown(value)
        }}/>
      </InputGroup>

      <NewWorkout
        id="type"
        addWorkout={handleWorkoutComponentChange}
        shouldReset={shouldReset}
        setShouldReset={()=>{setShouldReset(false)}}
        exerciseCategory={exerciseCategory?.workoutCategories}
        exerciseList={exerciseList}
      />
    <Button onClick={addNewWorkout} variant="primary" type="submit">Add Another Exercise</Button>
       


    


    <Button onClick ={onSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    ) : (
      <p>
        You need to be logged in to endorse skills. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>
    )}
    <Table striped bordered hover>
    <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Category</th>
          <th>Description</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Weight UOM</th>
        </tr>
      </thead>
      <tbody>
                {totalWorkout.map((totalWorkoutObj) => (
                  <tr key={totalWorkout.id}>
                    <td>{totalWorkoutObj.id}</td>
                    <td>{totalWorkoutObj.type}</td>
                    <td>{totalWorkoutObj.category}</td>
                    <td>{totalWorkoutObj.description}</td>
                    <td>{totalWorkoutObj.sets}</td>
                    <td>{totalWorkoutObj.repetitions}</td>
                    <td>{totalWorkoutObj.weight}</td>
                    <td>{totalWorkoutObj.weightUom}</td>
                    <td>
                      <button
                        type="button"
                        // onClick={() => removeStudent(student.id)}
                      >
                        <span role="img" aria-label="delete">
                          ✖️
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
    </Table>
    
    </Container>
    
  );
};



export default Workout
