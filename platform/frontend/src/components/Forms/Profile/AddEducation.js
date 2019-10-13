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
      description: "",
      submitted: false
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

    if (school !== "" && degree !== "" && fieldofstudy !== "" && from !== "") {
      this.setState({ submitted: true })
    }
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
    const { school, degree, fieldofstudy, from, to, current, description, submitted } = this.state;

    return (
      <Fragment>
        <div className = "wrap-set-bottom">
          <h1 className = "large text-primary" style = {{marginTop: "15px"}}>
            Add Your Education
          </h1>
          <div style = {{background: "rgba(154, 154, 154, .1)", padding: "25px", borderRadius: "4px"}}>
            <p className = "lead">
              <i className = "fas fa-graduation-cap"></i> &nbsp;
              Add any school, bootcamp, etc that you have attended
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
              <input
                type = {submitted ? "button" : "submit"}
                id = "addEdu"
                className = {submitted ? "btn btn-dim my-1" : "btn btn-primary my-1"}
                value = {submitted ? "Adding Education..." : "Add"}
              />
              {submitted && <i className = "fas fa-circle-notch fa-spin"></i>}&nbsp;&nbsp;&nbsp;&nbsp;
              <Link className = "btn btn-dark my-1" to = "/dashboard"> Go Back </Link>
            </form>
          </div>
        </div>
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
