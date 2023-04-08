import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import "react-datepicker/dist/react-datepicker.css";


const Workout = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Form>
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Select Date</InputGroup.Text>
            <div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
      </InputGroup>
      
      <InputGroup>
        <InputGroup.Text>Warmup</InputGroup.Text>
        <Form.Control placeholder="Enter in your warmup details" as="textarea" aria-label="Warmup" />
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>Cooldown</InputGroup.Text>
        <Form.Control placeholder="Enter in your cooldown details" as="textarea" aria-label="Cooldown" />
      </InputGroup>

      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Select Workout Type:</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Upper Body</option>
            <option>Lower Body</option>
          </Form.Select>
        </Form.Group>



    
    </Form>
  );
};

export default Workout