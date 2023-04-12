import React, { useState, useRef, useEffect } from "react";

import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const NewWorkout = ({addWorkout, shouldReset, setShouldReset}) =>{
    const formOneRef = useRef(null)
    // const [workout, setWorkout] =useState({
    //     type: null,
    //     sets: null,
    //     repetitions: null,
    //     weight: null,
    //     weightUom: null,
    //     date: null,
    //     category: null,
    //     description: null
    // })


    useEffect(() =>{
        if(shouldReset === true){
            formOneRef.current.reset();
            setShouldReset(false)
            console.log("HELP ME FIND THIS",shouldReset)
        }
    },[shouldReset])

    console.log("HELP ME FIND THIS",shouldReset)

    const onInputChange = (e) =>{
        e.preventDefault();
        console.log(e.target.value);
        const {value, id, checked, type} = e.target
        console.log(value, id, checked, type)
        let temp = { 
            [id]: value
        }
        if(type === 'radio') {
            if (id === 'KGS' && checked){
                temp = {
                    weightUom: "KGS"
                }
            
            }
            if (id === 'LBS' && checked){
                temp = {
                    weightUom: "LBS"
                }
            
            }
        }

        addWorkout(temp);

    }

 



    return(
<Container>
    <Form id ='weight-training' validated={shouldReset} ref={formOneRef}>
      <Row clasName ="mb-3">
      <Form.Group  as={Col} className ="mb-3" >
          <Form.Label >Select Workout Type:</Form.Label>
          <Col sm={10}>
          <Form.Select id= 'category' onChange = {onInputChange} defaultValue="Choose...">
            <option>Choose...</option>
            <option>Upper Body</option>
            <option>Lower Body</option>
          </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Col} className ="mb-3" >
          <Form.Label >Select Workout:</Form.Label>
          <Form.Select id= 'description' onChange = {onInputChange} defaultValue="Choose...">
            <option>Choose...</option>
            <option>Shoulder Press</option>
            <option>Squat</option>
          </Form.Select>
           
        </Form.Group>
        </Row> 

        <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Number of Sets</Form.Label>
          <Form.Control id = 'sets' onChange = {onInputChange}/>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Number of Reps</Form.Label>
          <Form.Control id= 'repetitions' onChange ={onInputChange} />
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Weight</Form.Label>
          <Form.Control id='weight' onChange={onInputChange} />
        </Form.Group>

        <Form.Group as={Col} className ="mb-3" >
          <Form.Label >Weight UOM:</Form.Label>
          <Form.Select id= 'weightUom' onChange = {onInputChange} defaultValue="Choose...">
            <option>Choose...</option>
            <option>LBS</option>
            <option>KGS</option>
          </Form.Select>
           
        </Form.Group>
        {/* <Form.Group as={Col}   id='weightUom'>
          <Form.Label>Weight UOM</Form.Label>
          <Col sm={10}>
            <Form.Check onChange={onInputChange}
            inline
              type="radio"
              label="LBS"
            
              id= "LBS"
            
            />
            <Form.Check onChange={onInputChange}
            inline
              type="radio"
              label="KGS"
        
              id="KGS"
             
            /> */}
          {/* </Col>
        </Form.Group> */}
        
      </Row>

      </Form>
    </Container>
    )
}

export default NewWorkout;