import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import serfsLogo from "../assets/images/serfsLogo.jpg";

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className='navLinks'>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='navLinks'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
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
