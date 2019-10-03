import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes  from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { doAddExperienceWithErrorCheck } from "../../../thunks/profile";

class AddExperience extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, company, location, from, to, current, description } = this.state;
    const expFormData = { title, company, location, from, to, current, description };
    const { history } = this.props;
    this.props.onAddExperience(expFormData, history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChecked() {
    this.setState({
      current: !this.state.current
    });
  }

  render() {
    const { title, company, location, from, to, current, description } = this.state;

    return (
      <Fragment>
        <h1 className = "large text-primary">
          Add An Experience
        </h1>
        <p className = "lead">
          <i className = "fas fa-code-branch"></i>
          Add any developer/programming positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className = "form" onSubmit = { this.onSubmit }>
          <div className = "form-group">
            <input type = "text" placeholder = "* Job Title" name = "title" required
            value = { title } onChange = { this.onChange } />
          </div>
          <div className = "form-group">
            <input type = "text" placeholder = "* Company" name = "company" required
            value = { company } onChange = { this.onChange } />
          </div>
          <div className = "form-group">
            <input type = "text" placeholder = "Location" name = "location"
            value = { location } onChange = { this.onChange } />
          </div>
          <div className = "form-group">
            <h4>From Date</h4>
            <input type = "date" name = "from"
            value = { from } onChange = { this.onChange } />
          </div>
          <div className = "form-group">
            <p>
              <input type = "checkbox" name = "current" 
              value = { current } onChange = { this.onChecked } />
              Current Job
            </p>
          </div>
          <div className = "form-group">
            <h4>To Date</h4>
            <input type = "date" name = "to" value = { to } 
            onChange = { this.onChange } disabled = { current ? "disabled" : "" } />
          </div>
          <div className = "form-group">
            <textarea name = "description" cols="30" rows="5" placeholder = "Job Description"
            value = { description } onChange = { this.onChange }></textarea>
          </div>
          <input type = "submit" className = "btn btn-primary my-1" />
          <Link className = "btn btn-light my-1" to = "/dashboard"> Go Back </Link>
        </form>
      </Fragment>
    );
  }
}

AddExperience.propTypes  = {
  onAddExperience: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapDispatchToPropsAddExperience = dispatch => ({
  onAddExperience: (expFormData, history) =>
    dispatch(doAddExperienceWithErrorCheck(expFormData, history))
});

const ConnectedAddExperience = connect(null, mapDispatchToPropsAddExperience)(withRouter(AddExperience));

export default ConnectedAddExperience;