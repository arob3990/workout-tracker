import React, { useState, useRef, useEffect } from "react";

// import { useMutation } from '@apollo/client';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const NewWorkout = ({addWorkout, shouldReset, setShouldReset, exerciseCategory = [], exerciseList = [] }) =>{
    const formOneRef = useRef(null)
    const [filteredList, setFilteredList] = useState([])
    // const { register, handleSubmit } = useForm();
   


    useEffect(() =>{
        if(shouldReset === true){
            formOneRef.current.reset();
            setShouldReset(false)
            // console.log("HELP ME FIND THIS",shouldReset)
        }
    },[shouldReset])

    // console.log("HELP ME FIND THIS",shouldReset)

    const onInputChange = (e) =>{
      e.preventDefault();
      console.log(e.target.value);
      let data = e?.target?.selectedOptions?.[0]?.getAttribute('data')
      let {value, id} = e.target
      let temp = {}
      switch(id){
        case 'description':{
          temp = {description:value, workouts:data}
        }
        break;
        case 'category':{
          const filteredExercises = exerciseList?.workouts.filter(ex =>  ex.category._id === data)
          setFilteredList(filteredExercises)
          temp = {category:value, categoryId: data}
        }
        break;
        default:{
          //cases for weight, repetitions and sets
          if(id === 'weight'|| id === 'repetitions'||id === 'sets'){
          temp = {[id]:parseInt(value)}
          } else {
            temp = {[id]:value} 
          }
        }
      }
      addWorkout(temp);
  }

    // OLD const onInputChange = (e) =>{
    //     e.preventDefault();
    //     console.log("target value",e.target.value);
    //     // console.log("selected options",e.target.selectedOptions[0].getAttribute('data'))
    //     let exerciseId = e?.target?.selectedOptions?.[0]?.getAttribute('data')
    //     let {value, id} = e.target
        
    //     if(id === 'category'){
    //       const filteredExercises = exerciseList?.workouts
    //     .filter(ex => {
    //       return ex.category._id === value
    //     })
    //       setFilteredList(filteredExercises)
    //       return
    //     }
    //     if(id === 'weight'|| id === 'repetitions'||id === 'sets'){
    //       value = parseInt(value)
    //     }

    //     console.log(value, id)
    //     let temp = { 
    //         [id]: value
    //     }
    //     if(exerciseId){
    //       console.log(exerciseId)
    //       temp = {workouts: exerciseId}
    //     }
    //     console.log("THIS IS THE TEMP",temp)
    

    //     addWorkout(temp);

    // }

    
    const exerciseTypeEls = exerciseCategory.map((category) => (
      <option key={category._id} data={category._id}>{category.name}</option>
    ));
 
    // OLD const exerciseTypeEls = exerciseCategory.map((category) => (
    //   <option key={category._id} value={category._id}>{category.name}</option>
    // ));

    const exerciseEls = filteredList
      .map((exercise) => (
        <option data={exercise._id} key={exercise._id}>{exercise.description}</option>
      ));

    return(
<Container>
    <Form id ='type' validated={shouldReset} ref={formOneRef} {...shouldReset && {value:""}}>
      <Row clasName ="mb-3">
      <Form.Group  as={Col} className ="mb-3" >
          <Form.Label >Upper Body or Lower Body Exercise?:</Form.Label>
          <Col sm={10}>
          <Form.Select id= 'category' onChange={onInputChange} {...shouldReset && {value:""}} defaultValue="Choose...">
            <option>Choose...</option>
            {exerciseTypeEls}
          </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Col} className ="mb-3" >
          <Form.Label >Select Exercise:</Form.Label>
          <Form.Select id= 'description' onChange={onInputChange} {...shouldReset && {value:""}} defaultValue="Choose...">
            <option>Choose...</option>
            {exerciseEls}
          </Form.Select>
           
        </Form.Group>
        </Row> 

        <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Number of Sets</Form.Label>
          <Form.Control id = 'sets' onChange = {onInputChange} {...shouldReset && {value:""}}/>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Number of Reps</Form.Label>
          <Form.Control id= 'repetitions' onChange ={onInputChange} {...shouldReset && {value:""}}/>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Weight</Form.Label>
          <Form.Control id='weight' onChange={onInputChange} {...shouldReset && {value:""}}/>
        </Form.Group>

        <Form.Group as={Col} className ="mb-3" >
          <Form.Label >Weight UOM:</Form.Label>
          <Form.Select id= 'weightUom' onChange = {onInputChange} {...shouldReset && {value:""}} defaultValue="Choose...">
            <option>Choose...</option>
            <option>LBS</option>
            <option>KGS</option>
          </Form.Select>
           
        </Form.Group>
        
      </Row>

      </Form>
    </Container>
    )
}

export default NewWorkout;