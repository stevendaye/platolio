import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes  from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { doAddEducationWithErrorCheck } from "../../../thunks/profile";

class AddEducation extends Component {
  constructor (props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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
    const { school, degree, fieldofstudy, from, to, current, description } = this.state;
    const eduFormData = { school, degree, fieldofstudy, from, to, current, description };
    const { history } = this.props;
    this.props.onAddEducation(eduFormData, history);
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
    const { school, degree, fieldofstudy, from, to, current, description } = this.state;

    return (
      <Fragment>
        <h1 className = "large text-primary">
          Add Your Education
        </h1>
        <p className = "lead">
          <i className = "fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
          you have attended
        </p>
        <small>* = required field</small>
        <form className = "form" onSubmit = { this.onSubmit }>
          <div className = "form-group">
            <input type = "text" placeholder = "* School or Bootcamp" name = "school"
            value = { school } onChange = { this.onChange } required />
          </div>
          <div className = "form-group">
            <input type = "text" placeholder = "* Degree or Certificate" name = "degree"
            value = { degree } onChange = { this.onChange } required />
          </div>
          <div className = "form-group">
            <input type = "text" placeholder = "Field Of Study" name = "fieldofstudy"
            value = { fieldofstudy } onChange = { this.onChange } required />
          </div>
          <div className = "form-group">
            <h4>From Date</h4>
            <input type = "date" name = "from" 
            value = { from } onChange = { this.onChange } required />
          </div>
          <div className = "form-group">
            <p>
              <input type = "checkbox" name = "current" 
              value = { current } onChange = { this.onChecked } />
              Current School or Bootcamp
            </p>
          </div>
          <div className = "form-group">
            <h4>To Date</h4>
            <input type = "date" name = "to" value = { to }
            onChange = { this.onChange }  disabled = { current ? "disabled" : "" } />
          </div>
          <div className = "form-group">
            <textarea name = "description" cols="30" rows="5" placeholder = "Program Description"
            value = { description } onChange = { this.onChange } required>
            </textarea>
          </div>
          <input type = "submit" className = "btn btn-primary my-1" />
          <Link className = "btn btn-light my-1" to = "/dashboard"> Go Back </Link>
        </form>
      </Fragment>
    );
  }
}

AddEducation.propTypes  = {
  onAddEducation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapDispatchToPropsAddEducation = dispatch => ({
  onAddEducation: (eduFormData, history) =>
    dispatch(doAddEducationWithErrorCheck(eduFormData, history))
});

const ConnectedAddEducation = connect(null, mapDispatchToPropsAddEducation)(withRouter(AddEducation));

export default ConnectedAddEducation;
