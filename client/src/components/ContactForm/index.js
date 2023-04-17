import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

 
const EmailContactForm = () => {

  const form = useRef();
  const [emailSent, setEmailSent] = useState(false);
 
  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”
 
    emailjs.sendForm('service_kd1fkcj', 'template_2bodlon', form.current, 'e6ZL4p1X6fAKPVmaI')
      .then((result) => {
        setEmailSent(true);
        form.current.reset();
      }, (error) => {
        
      });
  };

  return (
    <Container>
      <Form ref={form} onSubmit={sendEmail}
        className="p-3 square border border-1 rounded bg-light"
        style={{backgroundColor: 'var(--third-color)'}}
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="user_name"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="user_email"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" />
        </Form.Group>

        <Button variant="primary" type="submit" >Send</Button>
      </Form>
      {emailSent && <p>Email sent successfully!</p>}
    </Container>
  );
};
 
export default EmailContactForm;
