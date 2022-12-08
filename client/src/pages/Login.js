import React, { useState } from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import '../index.css';


const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
    

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
    
        try{
          const { data } = await login({
            variables: {...formState}
          });
    
          Auth.login(data.login.token)
        } catch (e) {
          console.log(e);
        }
        // clear form values
        setFormState({
          email: '',
          password: '',
        });
      };
    
    
    console.log(error);
      return (
        <main className='signUpForm loginPage'>
          <h2>Login</h2>
          <div>
            <form onSubmit={handleFormSubmit}>
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
                Login
              </button>
              {error && <div>Login failed</div>}
            </form>
          </div>
        </main>
      );
    };
    
    export default Login;