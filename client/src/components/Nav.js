import React from "react";
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import serfsLogo from "../assets/images/serfsLogo.jpg";

const Nav = () => {
  const location = useLocation();

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li className={location.pathname === "/about" ? "navActive" : ""}>
            <Link className="link-contain" to="/about">
              About
            </Link>
          </li>
          <li className={location.pathname === "/dashboard" ? "navActive" : ""}>
            <Link className="link-contain" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a
              href="/"
              className="link-contain"
              onClick={() => Auth.logout()}
            >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li className={location.pathname === "/" ? "navActive" : ""}>
            <Link className="link-contain" to="/">
              Home
            </Link>
          </li>
          <li className={location.pathname === "/about" ? "navActive" : ""}>
            <Link className="link-contain" to="/about">
              About
            </Link>
          </li>
          <li className={location.pathname === "/login" ? "navActive" : ""}>
            <Link className="link-contain" to="/login">
              Login
            </Link>
          </li>
          <li className={location.pathname === "/signup" ? "navActive" : ""}>
            <Link className="link-contain" to="/signup">
              Sign Up
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <Link to="/">
        <div className="logoTitle">
          <span role="img" aria-label="serfsLogo">
            <img src={serfsLogo} alt="Project logo for The Serf’s Market" />
          </span>
          <h1>The Serf's Market</h1>
        </div>
      </Link>

      <nav>{showNavigation()}</nav>
    </header>
  );
};

export default Nav;
