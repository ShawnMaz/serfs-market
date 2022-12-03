import React from 'react';
import { useQuery } from '@apollo/client';
import Login from '../components/Login';
import Signup from '../components/Signup';


const Home = () => {



  return (
    <main>
      <div>
        <img src='' alt='logo' />
      </div>
      <div>
        Stock Status
        <div>
          pull current status and ranking the stock categories based on highest to lowest
        </div>
      </div>
      <div>
        <Login />
      </div>
    </main>
  )  

};

export default Home;