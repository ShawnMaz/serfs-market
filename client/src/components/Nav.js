import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import serfsLogo from "../assets/images/serfsLogo.jpg";

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-1">
            <Link to="/about">About</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
          <li className="mx-1">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <Link to="/">
        <div className='logoTitle'>
          <span role="img" aria-label="serfsLogo">
            <img
              src={serfsLogo}
              alt="Project logo for The Serf’s Market"
            />
          </span>
          <h1>The Serf's Market</h1>
        </div>
      </Link>
     
      <nav>{showNavigation()}</nav>
    </header>
  );
};

export default Nav;
