import React, { Fragment, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import doLoginUserWithErrorCheck from "../../thunks/login";
import PropTypes from "prop-types";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmit(e) {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.onLogin(email, password);
  }

  render () {
    const { email, password } = this.state;
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to = "/dashboard"/>
    }

    return (
      <Fragment>
        <h1 class="large text-primary">Sign In</h1>
        <p class="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>

        <form class="form" onSubmit={ this.onSubmit }>
          <div class="form-group">
            <input
              type = "email"
              placeholder = "Email Address"
              name = "email"
              value = {email}
              onChange = { this.onChange }
              ref = { el => this.mailInput = el }
              required
            />
          </div>
          <div class="form-group">
            <input
              type = "password"
              placeholder = "Password"
              name = "password"
              minLength = "6"
              value = {password}
              onChange = { this.onChange }
              required
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Sign In" />
        </form>
        <p class="my-1">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </Fragment>
    )
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToPropsLogin = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

const mapDisptachToPropsLogin = dispatch => {
  return {
    onLogin: (email, password) => dispatch(doLoginUserWithErrorCheck(email, password))
  }
};

const ConnectedLogin = connect(mapStateToPropsLogin, mapDisptachToPropsLogin)(Login);

export default ConnectedLogin;
