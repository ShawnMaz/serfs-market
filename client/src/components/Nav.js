import React from "react";
import About from "../pages/About";
import Login from "../pages/Login";
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
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="serfsLogo">
            <img
              src={serfsLogo}
              style={{ width: "15%" }}
              alt="Project logo for The Serf’s Market"
            />
          </span>
          The Serf's Market
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
};

export default Nav;
