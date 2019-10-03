import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import doSetRemoveNotification from "../../thunks/notifications";
import doRegisterUserWithErrorCheck from "../../thunks/register";

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPass: ""
    }

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
  }

  render () {
    const { isAuthenticated } = this.props;
    const { name, email, password, confirmPass } = this.state;

    if (isAuthenticated) {
      return <Redirect to = "/dashboard"/>
    }
    return (
      <Fragment>
        <h1 className = "large text-primary">Sign Up</h1>
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
          <input type = "submit" className = "btn btn-primary" value = "Sign Up" />
        </form>
        <p className = "my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    )
  }
}

SignUp.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToPropsSignUp = state => ({
  isAuthenticated: state.authState.isAuthenticated
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
