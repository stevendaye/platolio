import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { doLogout } from "../../actions/auth";
import { doClearProfile } from "../../actions/profile";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, isLoading, user }, onLogout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to = "/profiles">
          <i className = "fas fa-users"></i>
          &nbsp; Developers
        </Link>
      </li>
      <li>
        <Link to = "/dashboard">
        <i className = "fas fa-user"></i>{" "}
        <span>{ user && user.name.split(" ")[0] }</span>
        </Link>
      </li>
      <li>
        <a href = "#/logout" onClick = { onLogout }>
          <i className = "fas fa-sign-out-alt"></i>{" "}
          <span>logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to = "/profiles">
          <i className = "fas fa-users"></i>
          &nbsp; Developers
        </Link>
      </li>
      <li>
        <Link to = "/signup">
          <i className = "fas fa-user-plus"></i>
          &nbsp; Sign Up
        </Link>
      </li>
      <li>
        <Link to = "/login">
          <i className = "fas fa-sign-in-alt"></i>
          &nbsp; Login
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
  onLogout: PropTypes.func.isRequired
}

const mapStateToPropsNavbar = state => ({
  auth: state.authState,
});

const mapDispatchToPropsNavbar = dispatch => ({
  onLogout: () => dispatch(doLogout()) && dispatch(doClearProfile())
});

const ConnectedNavbar = connect(mapStateToPropsNavbar, mapDispatchToPropsNavbar)(Navbar);

export default ConnectedNavbar;
