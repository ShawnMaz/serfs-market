import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import News from "../components/News";
import { useQuery } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_STOCKS,
  QUERY_USER,
  QUERY_NEWS,
} from "../utils/queries";
import scroll from "../assets/images/scroll.jpg";
import ManageStocks from "../components/ManageStock";
import MyPortfolio from "../components/MyStocks";

const Dashboard = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const { data: market } = useQuery(QUERY_STOCKS);
  const allStocks = market?.stocks || [];

  const { data: events } = useQuery(QUERY_NEWS);
  const newsEvents = events?.news || [];

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/dashboard" />;
  }

  if (loading) {
    <h2>LOADING...</h2>;
  }
  return (
    <section className="dashboardPage">
      <div className="serfNews">
        <div className="serfScroll">
          <h2>Serf’s News</h2>
          <span role="img" aria-label="scrollPaper">
            <img src={scroll} alt="Old yellow scroll paper." />
          </span>
        </div>
        {newsEvents.length ? (
          newsEvents.map((event, index) => (
            <News key={event._id} event={event} index={index} />
          ))
        ) : (
          <p>No Fresh News</p>
        )}
      </div>

      <div className="dashboardUserInfo">
        <h1>Name: {user.username}</h1>
        <br></br>
        <h1>Balance: ${user.money}</h1>
        <br></br>
        <div className="dashboardStockInfo">
        <div className="myStocks">
          <h2>My Stocks</h2>
          <MyPortfolio profile={user} stocks={allStocks} />
        </div>
      </div>
      </div>
      

      <div className="dashboardCurrentMarket">
        <h2>Current Market</h2>
          {allStocks.length && <ManageStocks stock={allStocks} />}
      </div>
    </section>
  );
};

export default Dashboard;
