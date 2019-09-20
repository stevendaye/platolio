import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";

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
    e.preventDefault();
    console.log("SUCCESS");
  }

  render () {
    const { email, password } = this.state;

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

export default Login;
