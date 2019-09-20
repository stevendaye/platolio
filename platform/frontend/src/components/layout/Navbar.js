import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>
  <nav className="navbar bg-dark">
    <h1>
      <Link to="/">
        Platolio
      </Link>
    </h1>
    <ul>
      <li>
        <Link to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/signup">
          Sign Up
        </Link>
      </li>
      <li>
        <Link to="/login">
          Login
        </Link>
      </li>
    </ul>
  </nav>

export default Navbar;