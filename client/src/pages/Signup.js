import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to hand errors
    try{
      // execute addUser mutation and pass in virable data from form
      const { data } = await addUser({
        variables: {...formState}
      });
      console.log(data)
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='signUpForm'> 
      <h2>Sign Up</h2>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder='Your username'
            name='username'
            type='username'
            id='username'
            value={formState.username}
            onChange={handleChange}
          />
          <input
            placeholder='Your email'
            name='email'
            type='email'
            id='email'
            value={formState.email}
            onChange={handleChange}
          />
          <input
            placeholder='password'
            name='password'
            type='password'
            id='password'
            value={formState.password}
            onChange={handleChange}
          />
          <button className="btn" type='submit'>
            Join Now
          </button>
          {error && <div>Sign Up Failed</div>}
        </form>
      </div>
    </main>
  );
};

export default Signup;
