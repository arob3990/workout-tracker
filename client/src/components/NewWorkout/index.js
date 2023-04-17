import React, { useState, useRef, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const NewWorkout = ({addWorkout, shouldReset, setShouldReset, exerciseCategory = [], exerciseList = [] }) =>{
    const formOneRef = useRef(null)
    const [filteredList, setFilteredList] = useState([])
   


    useEffect(() =>{
        if(shouldReset === true){
            formOneRef.current.reset();
            setShouldReset(false)

        }
    },[shouldReset])

    const onInputChange = (e) =>{
      e.preventDefault();
      // console.log(e.target.value);
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
    
    const exerciseTypeEls = exerciseCategory.map((category) => (
      <option key={category._id} data={category._id}>{category.name}</option>
    ));


    const exerciseEls = filteredList
      .map((exercise) => (
        <option data={exercise._id} key={exercise._id}>{exercise.description}</option>
      ));

    return(
<Container className="p-2">
  <Form className="p-3 square border border-1 rounded bg-light" id='type' validated={shouldReset} ref={formOneRef} {...shouldReset && { value: "" }}>
    <Row clasName="mb-3">
      <Form.Group as={Col} className="mb-3" xs={12} md={6} lg={6}>
        <Form.Label>Upper Body or Lower Body Exercise?:</Form.Label>
        <Form.Select id='category' onChange={onInputChange} {...shouldReset && { value: "" }} defaultValue="Choose...">
          <option>Choose...</option>
          {exerciseTypeEls}
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col} className="mb-3" xs={12} md={6} lg={6}>
        <Form.Label>Select Exercise:</Form.Label>
        <Form.Select id='description' onChange={onInputChange} {...shouldReset && { value: "" }} defaultValue="Choose...">
          <option>Choose...</option>
          {exerciseEls}
        </Form.Select>
      </Form.Group>
    </Row>
    <Row className="mb-3">
      <Form.Group as={Col} xs={12} md={3} lg={3}>
        <Form.Label>Number of Sets</Form.Label>
        <Form.Control id='sets' onChange={onInputChange} {...shouldReset && { value: "" }} />
      </Form.Group>
      <Form.Group as={Col} xs={12} md={3} lg={3}>
        <Form.Label>Number of Reps</Form.Label>
        <Form.Control id='repetitions' onChange={onInputChange} {...shouldReset && { value: "" }} />
      </Form.Group>
      <Form.Group as={Col} xs={12} md={3} lg={3}>
        <Form.Label>Weight</Form.Label>
        <Form.Control id='weight' onChange={onInputChange} {...shouldReset && { value: "" }} />
      </Form.Group>
      <Form.Group as={Col} className="mb-3" xs={12} md={3} lg={3}>
        <Form.Label>Weight UOM:</Form.Label>
        <Form.Select id='weightUom' onChange={onInputChange} {...shouldReset && { value: "" }} defaultValue="Choose...">
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