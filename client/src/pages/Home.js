import React from 'react';
import { useQuery } from '@apollo/client';
import Signup from '../components/Signup';
import market from '../assets/images/market.jpg';
import { QUERY_STOCKS } from '../utils/queries';
import Auth from '../utils/auth';



const Home = () => {
  const { loading, data } = useQuery(QUERY_STOCKS);
  const stockData = data?.stocks || [];

  // console.log(stockData)
  if (loading) {
    return <h2>LOADING...</h2>
  }

  return (
    <main className='mainPage'>
      <div className='home'>
        <div className='marketPlace'>
          <h2>
            The Serf’s Market - A Medieval Stock Exchange
          </h2>
          <span role='img' aria-label='market'>
            <img src={market} style={{ width: '100%'}} alt='Peasants at the market.' />
          </span>
        </div>
        <div className='stockItems'>
          <h2>Stock Status 🗡️ 🛡️ 🏹 🍎 🍞 🏺 📿 🧺 💰</h2>
          <ul>
            {stockData.map((stocks) => (
              <li key={stocks._id}>
                {stocks.stockName}<br/>
                ${stocks.stockPrice * stocks.multiplier} <br/>
                {stocks.stockDescription}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {!Auth.loggedIn() &&  <Signup />}
      </div>
    </main>
  )  

};

export default Home;