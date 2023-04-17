import React from "react";
import Container from "react-bootstrap/esm/Container";

import EmailContactForm from "../components/ContactForm";


const Home = () => {
  return (
    <Container>
      <Container className="p-3 square border border-1 rounded bg-white">
        <h3>Welcome to FitTrackr, an easy to use application to log and track your daily workouts!</h3>
        <p>
            To keep things simple, FitTrackr allows you to enter in your workout information and upon
            submitting it, you can view your past workouts by day in your Workout History.
        </p>
        <p>
            FitTrackr is always looking for new ways to enhance the user experience. If you have any ideas 
            on how to improve our app, submit your feedback using the Contact Form below
        </p>
        <EmailContactForm />
        
        </Container>  
    </Container>
  );
};

export default Home;
