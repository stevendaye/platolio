import React, { Fragment, Component } from "react";
import axios from "axios";

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

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmit(e) {
    const { name, email, password, confirmPass } = this.state;
    e.preventDefault();
    if (password !== confirmPass) {
      console.log("Passwords do not match");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const newUser = { name, email, password };
        const body =  JSON.stringify(newUser);
  
        const res = await axios.post("/users/register", body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  }

  render () {
    const { name, email, password, confirmPass } = this.state;

    return (
      <Fragment>
        <h1 class="large text-primary">Sign Up</h1>
        <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>

        <form class="form" onSubmit={ this.onSubmit }>
          <div class="form-group">
            <input
              type = "text"
              placeholder = "Name"
              name = "name"
              value = {name}
              onChange = { this.onChange }
              ref = { el => this.input = el }
              required
            />
          </div>
          <div class="form-group">
            <input
              type = "email"
              placeholder = "Email Address"
              name = "email"
              value = {email}
              onChange = { this.onChange }
              required
            />
            <small class="form-text">
              This site uses Gravatar so if you want a profile image, use a Gravatar email
            </small>
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
          <div class="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              minLength="6"
              value = {confirmPass}
              onChange = { this.onChange }
              required
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Sign Up" />
        </form>
        <p class="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </Fragment>
    )
  }
}

export default SignUp;
