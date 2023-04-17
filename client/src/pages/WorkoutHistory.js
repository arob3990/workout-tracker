import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';


import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';



const WorkoutHistory = () =>{

    const { data, loading, error } = useQuery(QUERY_USER, {fetchPolicy: 'no-cache'});

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    // console.log("DATA",data)


 
    const uniqueDates = [...new Set(data?.me?.userWorkouts?.map((workout) => workout.date))];

    
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(parseInt(dateString)).toLocaleDateString([], options);
      } 

 
  
    return(
        <>
    <h2 style={{textAlign: "center"}}>Displaying Past Workouts for {data.me.firstName} {data.me.lastName}</h2>
     <Container className="p-3 square border border-1 rounded bg-white">
     {Auth.loggedIn() ? (
     <Accordion>
     {uniqueDates.map((date) => (
       <Accordion.Item key={date} eventKey={date}>
         <Accordion.Header>{formatDate(date)}</Accordion.Header>
         <Accordion.Body>
         <div style={{ height: '200px', overflow: 'auto' }}>
           <Table striped bordered hover>
             <thead>
               <tr>
                 <th>Type</th>
                 <th>Category</th>
                 <th>Description</th>
                 <th>Sets</th>
                 <th>Repetitions</th>
                 <th>Weight</th>
                 <th>Weight UOM</th>
                 <th>Warmup/Cooldown</th>
               </tr>
             </thead>
             <tbody>
               {data?.me?.userWorkouts?.filter((workout) => workout.date === date).map((workout) => (
                 <tr key={workout._id}>
                   <td>{workout.type}</td>
                   <td>{workout.workouts?.category?.name}</td>
                   <td>{workout.workouts?.description}</td>
                   <td>{workout.sets}</td>
                   <td>{workout.repetitions}</td>
                   <td>{workout.weight}</td>
                   <td>{workout.weightUom}</td>
                   <td>{workout.warmup_cooldown}</td>
                 </tr>
               ))}
             </tbody>
           </Table>
           </div>
         </Accordion.Body>
       </Accordion.Item>
     ))}
   </Accordion>
     ) : (
        <p>
        You need to be logged in to view your workout History. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </p>
     )}
    </Container>
    </>
    
)
}

export default WorkoutHistory

