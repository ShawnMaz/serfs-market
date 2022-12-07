import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import News from "../components/News";
import { useMutation, useQuery } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_STOCKS,
  QUERY_USER,
  QUERY_NEWS,
} from "../utils/queries";
import { useStockContext } from "../utils/GlobalState";
import { UPDATE_STOCK, UPDATE_STOCK_ENTRY } from "../utils/actions";
import serfsLogo from "../assets/images/serfsLogo.jpg";
import scroll from "../assets/images/scroll.jpg";
import ManageStocks from "../components/ManageStock";
import MyPortfolio from "../components/MyStocks";

const Dashboard = () => {
  // const [state, dispatch] = useStockContext();

  // const { stocks, stockEntry } = state;

  // const buyStock = stockId => {
  //     const stock = stockEntry.find((choice) => choice.stockId === stockId)
  //     if(stock){
  //         dispatch ({
  //             type: UPDATE_STOCK_ENTRY,
  //             stockId: stockId,
  //             quantity: parseInt(stockEntry.quantity) + 1
  //         })

  //     }
  //     console.log (parseInt(stockEntry[0].quantity) + 1)
  //     console.log(stock)
  // }

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const { data: market } = useQuery(QUERY_STOCKS);
  const allStocks = market?.stocks || [];

  const { data: events } = useQuery(QUERY_NEWS);
  const event = events?.news || {};


  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/dashboard" />;
  }

  if (loading) {
    <h2>LOADING...</h2>;
  }
  return (
    <section className='dashboardPage'>
      <div className='dashboardUserInfo'>
        <h1>Name: {user.username}</h1><br></br>
        <h1>Balance: {user.money}</h1><br></br>
      </div>  
      <div className='dashboardStockInfo'> 
        <div className='myStocks'>
          <h2>My Stocks</h2>
          <MyPortfolio profile={user} stocks={allStocks} />

          {/* <div>
                      <ul>
                          {stockEntry.map((eachStock) => (
                              <li 
                                  key={eachStock.stockId}
                              >
                                  {eachStock.quantity}
                                  <button onClick={() => {buyStock(eachStock.stockId)}}>Add</button>
                              </li>

                          ))}
                      </ul>

                  </div> */}
        </div>
        <div className='serfNews'>
          <div className='serfScroll'>
            <h2>Serf’s News</h2>
            <span role='img' aria-label='scrollPaper'>
              <img src={scroll} alt="Old yellow scroll paper." />
            </span>
          </div>
            {event.length ? event.map((event) => (
              <News key={event._id} event={event} />
            )):null}
        </div>
      </div>
      <div className='dashboardCurrentMarket'>
        <h2>Current Market</h2>
          {allStocks &&
            allStocks.map((stock) => (
              <ManageStocks key={stock._id} stock={stock} />
            ))}
      </div>
    </section>
  );
};

export default Dashboard;
