
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const { data: workoutHistory } = useQuery(QUERY_USER);
let user;

if (workoutHistory) {
    user = data.user;
}

const WorkoutHistory = () =>{



    return(
        <>
        <Container>
            {user ? (
                <>
                <h2>
                    Workout History for {user.firstName} {user.lastName}
                </h2>
    <Accordion defaultActiveKey="0">
    {user.userWorkouts.map((userWorkout) => (
        <Accordion.Item eventKey="0" key={userWorkout._id}>
        <Accordion.Header>
            {new Date(parseInt(userWorkout.date)).toLocaleDateString()}
        </Accordion.Header>
            <Accordion.Body>
                TEST FILLER
                {/* {userWorkout.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                        <Link to={`/products/${_id}`}>
                            <img alt={name} src={`/images/${image}`} />
                            <p>{name}</p>
                        </Link>
                        <div>
                            <span>${price}</span>
                        </div>
                    </div>
                ))} */}
            </Accordion.Body>
      </Accordion.Item>

    ))}
    
      
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
    ) : null}
    </Container>
    </>
    )
}

export default WorkoutHistory