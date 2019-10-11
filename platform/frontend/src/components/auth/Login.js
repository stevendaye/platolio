import React, { Fragment, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import doLoginUserWithErrorCheck from "../../thunks/login";
import PropTypes from "prop-types";

class Login extends Component {
  _isChecked = false;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      submitted: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    const  { feedback } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    this.props.onLogin(email, password);

    if (email !== "" && email.includes("@") && password.length >= 6) {
      this.setState({ submitted: true });
    }

    if (feedback === "Invalid Entries") {
      this.setState({ submitted: false });
    } else if (feedback === "Valid Entries") {
      this.setState({ submitted: true });
    }
  }

  componentWillReceiveProps(props) {
    if (props.feedback === "Invalid Entries") {
      this.setState({ submitted: false });
    } else if (props.feedback === "Valid Entries") {
      this.setState({ submitted: true });
    }
  }

  render () {
    const { isAuthenticated } = this.props;
    const { email, password, submitted } = this.state;

    if (isAuthenticated) {
      return <Redirect to = "/dashboard"/>
    }

    return (
      <Fragment>
        <h1 className = "large text-primary" style = {{marginTop: "20px"}}>Sign In</h1>
        <div style = {{background: "rgba(154, 154, 154, .1)", padding: "25px", borderRadius: "4px"}}>
          <p className = "lead"><i className = "fas fa-user"></i> Sign Into Your Account</p>

          <form className = "form" onSubmit={ this.onSubmit }>
            <div className = "form-group">
              <input
                type = "email"
                placeholder = "Email Address"
                name = "email"
                value = {email}
                onChange = { this.onChange }
                required
              />
            </div>
            <div className = "form-group">
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
            <input
              type = {submitted ? "button" : "submit"}
              className = {submitted ? "btn btn-dim" : "btn btn-primary"}
              value = {submitted ? "Signing in..." : "Sign in"}
            />
            {submitted && <i className = "fas fa-circle-notch fa-spin"></i>}
          </form>
          <p className = "my-1">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  feedback: PropTypes.string
}

const mapStateToPropsLogin = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  feedback: state.entriesState.message
});

const mapDisptachToPropsLogin = dispatch => {
  return {
    onLogin: (email, password) => dispatch(doLoginUserWithErrorCheck(email, password))
  }
};

const ConnectedLogin = connect(mapStateToPropsLogin, mapDisptachToPropsLogin)(Login);

export default ConnectedLogin;
