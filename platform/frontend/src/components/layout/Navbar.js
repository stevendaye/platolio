import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { doLogout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, isLoading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a href = "#/logout" onClick = { logout }>
          <i className = "fas fa-sign-out-alt"></i>{" "}
          <span className = "hide-sm">logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="#/profiles">
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
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          Platolio
        </Link>
      </h1>
      { !isLoading && (
        <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
      )}
    </nav>
  );
}

Navbar.propsTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToPropsNavbar = state => ({
  auth: state.authState,
});

const mapDispatchToPropsNavbar = dispatch => ({
  logout: () => dispatch(doLogout())
});

const ConnectedNavbar = connect(mapStateToPropsNavbar, mapDispatchToPropsNavbar)(Navbar);

export default ConnectedNavbar;
