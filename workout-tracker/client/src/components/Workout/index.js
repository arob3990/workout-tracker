import React, { useState, useEffect, useRef } from "react";
// import { ADD_WORKOUT, SET_WORKOUT};
import DatePicker from "react-datepicker";
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import "react-datepicker/dist/react-datepicker.css";
import NewWorkout from "../NewWorkout.js";

const Workout = () => {
    const formReset = useRef(null)
  const [startDate, setStartDate] = useState(new Date());
  const [workout, setWorkout] = useState({})
  const [totalWorkout, setTotalWorkout] = useState([]);
  const [shouldReset, setShouldReset] = useState(false);
  const [warmup, setWarmup] = useState('');
  const [cooldown, setCooldown] = useState('');
  useEffect(()=> {
    setWorkout({
        ...workout, date: startDate,
    })
  },[startDate])



  const addNewWorkout = (e) =>{
    e.preventDefault();
    setTotalWorkout([
        ...totalWorkout, workout
    ])
    

    setWorkout({date: workout.date});
    setShouldReset(true);
 
    
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setTotalWorkout([
        ...totalWorkout, workout, {type: "warmup", warmup_cooldown: warmup}, {type: "cooldown", warmup_cooldown: cooldown}
    ])
    formReset.current.reset();
    setShouldReset(true);
  }

  console.log(totalWorkout)

  const onDropdownChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
}

const handleWorkoutComponentChange = (workoutComponentObjects) =>{

    setWorkout({...workout, ...workoutComponentObjects})
}

console.log(workout)
  return (
    <Container>
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

      <NewWorkout id = "weighttraining" addWorkout = {handleWorkoutComponentChange} shouldReset = {shouldReset} setShouldReset ={()=>{setShouldReset(false)}} />
    <Button onClick={addNewWorkout} variant="primary" type="submit">Add Another Workout</Button>
       


    


    <Button onClick ={onSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
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
