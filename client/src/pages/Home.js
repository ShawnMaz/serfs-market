import React from 'react';
import { useQuery } from '@apollo/client';
import Login from '../components/Login';
import Signup from '../components/Signup';
import market from '../assets/images/market.jpg';


const Home = () => {



  return (
    <main>
      <span role='img' aria-label='market'>
        <img src={market} style={{ width: '50%'}} alt='Peasants at the market.' />
      </span>
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