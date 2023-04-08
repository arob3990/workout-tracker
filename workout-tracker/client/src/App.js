import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Workouts from './pages/Workouts'
import Nav from './components/Nav'
import Footer from './components/Footer'

import Workout from './components/Workout'

import './App.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Workout />
    // <ApolloProvider client={client}>
    //   <Router>
    //     <div className="flex-column justify-flex-start min-100-vh">
    //       {/* <Nav /> */}
    //       <div >
    //         <Routes>
    //           {/* <Route 
    //             path="/" 
    //             element={<Home />}
    //           />
    //           <Route 
    //             path="/login"
    //             element={<Login />}
    //           />
    //           <Route 
    //             path="/signup"
    //             element={<Signup />}
    //           /> */}
    //           <Route 
    //             path="/workouts" 
    //             element={<Workouts />}
    //           />
    //           {/* <Route 
    //             path="/profile" 
    //             element={<Profile />}
    //           /> */}
    //         </Routes>
    //       </div>
    //       <Footer />
    //     </div>
    //   </Router>
    // </ApolloProvider>
  );
}

export default App;