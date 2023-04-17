import React, { useState, useEffect, useRef } from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import NewWorkout from "../NewWorkout";

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


 

  useEffect(()=> {
    setExercise({
        ...exercise, date: startDate, user: userId, type: "weight-training"

    })
  },[startDate])

  if (Auth.loggedIn() ) {
    // console.log("USER ID", Auth.getProfile().data._id);
    userId = Auth.getProfile().data._id
  }

  const addNewWorkout = (e) =>{
    e.preventDefault();
    setTotalWorkout([
        ...totalWorkout, exercise
    ])
    

    setExercise({date: exercise.date, user: userId, type: "weight-training"});
    // console.log("setExercise:",exercise)
    setShouldReset(true);
 
    
  }

  // console.log("payload to graphql:" ,userId, totalWorkout)

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
      // console.log("TOTAL WORKOUT",totalWorkout)

      const data  = await addCreateWorkout({
        variables: { userId, userworkout:finalTotalWorkout }
      });
      formReset.current.reset();
      setShouldReset(true);
    } catch (err) {
      console.error(err);
    }
    
  }


const handleWorkoutComponentChange = (workoutComponentObjects) =>{
    setExercise({...exercise, ...workoutComponentObjects})
}

  return (
    
    <Container className="p-3">
    {Auth.loggedIn() ? (
    <Container className="p-3 square border border-1 rounded bg-light m-2">
    <Form className="p-3 square border border-1 rounded bg-white" validated={shouldReset} ref = {formReset}>
        <InputGroup className="p-2">
        <InputGroup.Text id="basic-addon1">Select Date</InputGroup.Text>
            <div>
            <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
      </InputGroup>
      
      <InputGroup className="p-2">
        <InputGroup.Text>Warmup</InputGroup.Text>
        <Form.Control id = "warmup" placeholder="Enter in your warmup details" as="textarea" aria-label="Warmup"
        onChange = {(e)=>{
            const{value} = e.target
            setWarmup(value)
        }} />
      </InputGroup>

      <InputGroup className="p-2">
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
    <Button className="p-1 m-2" onClick={addNewWorkout} variant="primary" type="submit">Add Another Exercise</Button>
    <Button className="p-1 m-2" onClick ={onSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    ) : (
      <p>
        You need to be logged in to enter in your workouts. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>
    )}
    <Container className="p-3 square border border-1 rounded bg-light m-2">
    <div style={{ height: '200px', overflow: 'auto' }}>
    <Table striped bordered hover>
    <thead>
        <tr>
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
                    <td>{totalWorkoutObj.type}</td>
                    <td>{totalWorkoutObj.category}</td>
                    <td>{totalWorkoutObj.description}</td>
                    <td>{totalWorkoutObj.sets}</td>
                    <td>{totalWorkoutObj.repetitions}</td>
                    <td>{totalWorkoutObj.weight}</td>
                    <td>{totalWorkoutObj.weightUom}</td>
                  </tr>
                ))}
              </tbody>
    </Table>
    </div>
    </Container>
    
    </Container>
    
  );
};



export default Workout
