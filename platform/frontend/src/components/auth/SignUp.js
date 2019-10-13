import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import doSetRemoveNotification from "../../thunks/notifications";
import doRegisterUserWithErrorCheck from "../../thunks/register";
import { getArrayOfObject } from "../layout/Notifications";

class SignUp extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      submitted: false,
      rerender: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    const { name, email, password, confirmPass } = this.state;
    e.preventDefault();
    if (password !== confirmPass) {
      this.props.onSetNotification("Passwords do not match", "danger");
    } else {
      this.props.onRegister(name, email, password);
    }

    if (password === confirmPass && password.length >= 6 && name.length > 5 && email.includes("@")) {
      this.setState({ submitted: true });
    }
  }

  componentWillReceiveProps() {
    const { feedback } = this.props;
    if (feedback === "Invalid Entries") {
      this.setState({ submitted: false });
    } else if (feedback === "Valid Entries") {
      this.setState({ submitted: true });
    }
  }

  render () {
    const { isAuthenticated } = this.props;
    const { name, email, password, confirmPass, submitted } = this.state;

    if (isAuthenticated) {
      return <Redirect to = "/dashboard"/>
    }
    return (
      <Fragment>
        <h1 className = "large text-primary" style = {{marginTop: "20px"}}>Sign Up</h1>
        <div style = {{background: "rgba(154, 154, 154, .1)", padding: "25px", borderRadius: "4px"}}>
          <p className = "lead"><i className = "fas fa-user"></i> Create Your Account</p>

          <form className = "form" onSubmit={ this.onSubmit }>
            <div className = "form-group">
              <input
                type = "text"
                placeholder = "Name"
                name = "name"
                value = {name}
                onChange = { this.onChange }
                ref = { el => this.nameInput = el }
                required
              />
            </div>
            <div className = "form-group">
              <input
                type = "email"
                placeholder = "Email Address"
                name = "email"
                value = {email}
                onChange = { this.onChange }
                required
              />
              <small className = "form-text">
                This site uses Gravatar so if you want a profile image, use a Gravatar email
              </small>
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
            <div className = "form-group">
              <input
                type = "password"
                placeholder = "Confirm Password"
                name = "confirmPass"
                minLength = "6"
                value = {confirmPass}
                onChange = { this.onChange }
                required
              />
            </div>
            <input
              type = {submitted ? "button" : "submit"}
              className = { submitted ? "btn btn-dim" : "btn btn-primary"}
              value = {submitted ? "Signing up..." : "Sign up"}
            />
            {submitted && <i className = "fas fa-circle-notch fa-spin"></i>}
          </form>
          <p className = "my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </Fragment>
    )
  }
}

SignUp.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  notifications: PropTypes.array,
  feedback: PropTypes.string.isRequired,
};

const getNotifications = state =>
  getArrayOfObject(state.notificationsState);

const mapStateToPropsSignUp = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  notifications:  getNotifications(state),
  feedback: state.entriesState.message
});

const mapDispatchToPropsSignUp = dispatch => {
  return {
    onSetNotification: (message, alert) =>
      dispatch(doSetRemoveNotification(message, alert)),
    onRegister: (name, email, password) =>
      dispatch(doRegisterUserWithErrorCheck(name, email, password))
  };
}

const ConnectedSignUp = connect(mapStateToPropsSignUp, mapDispatchToPropsSignUp)(SignUp);

export default ConnectedSignUp;
