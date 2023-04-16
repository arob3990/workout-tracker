
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';

import { groupBy } from 'lodash'

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'

import Auth from '../utils/auth';

const WorkoutHistory = () =>{

    const { data } = useQuery(QUERY_USER, {fetchPolicy: 'network-only'});

    
 
    const uniqueDates = new Set(
        data.me.userWorkouts.map((workout) => workout.date)
      );

      console.log("unique dates",uniqueDates)
      


    return(
        <>
     <Container>
     <Accordion>
      {Array.from(uniqueDates).map((date) => (
        <Accordion.Item key={date} eventKey={date}>
          <Accordion.Header>{date}</Accordion.Header>
          <Accordion.Body>
            {data.me.userWorkouts
              .filter((workout) => workout.date === date)
              .map((workout) => (
                <div key={workout._id}>
                  <p>{workout.type}</p>
                  {/* Add other workout details here */}
                </div>
              ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
    </Container>
    </>
    
)
}

export default WorkoutHistory

