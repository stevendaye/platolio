import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { doRemoveExperienceWithErrorCheck } from "../../thunks/profile";

const Experience = ({ experience, onRemoveExperience }) => {
  const experiences = experience;

  return (
    <Fragment>
      <div id = "top"></div>
      <h2 className = "my-2"> Experience Credentials </h2>
      <table className = "table">
        <span style = {{marginLeft: "17px", display: "block"}}>
          <strong>Company <span className = "hide-sm">- Title</span> - Year</strong>
        </span>
        <tbody>
          {experiences.map(exp =>
            <span style = {{display: "block"}}>
              <tr key = { exp._id }>
                <td>{exp.company}</td>
                <td className = "hide-sm">{exp.title}</td>
                <td>
                  <Moment format = "YYYY/MM/DD">{exp.from}</Moment> -{" "}
                  {exp.to === null
                    ? "Now"
                    : <Moment format = "YYYY/MM/DD">{exp.to}</Moment>
                  }
                </td>
                <td className = "hide-sm">
                  <a href = "#top">
                    <button
                    className = "btn btn-danger" style = {{ borderRadius: "19px" }}
                    onClick = { () => { onRemoveExperience(exp._id) } }
                    >
                      <i className = "fas fa-trash-alt"></i>
                    </button>
                  </a>
                </td>
              </tr>
              <a href = "#top">
                <button
                className = "btn btn-danger btn-delete"
                onClick = { () => { onRemoveExperience(exp._id) } }
                >
                  <i className = "fas fa-trash-alt"></i>
                </button>
              </a>
            </span>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experiences: PropTypes.array,
  onRemoveExperience: PropTypes.func.isRequired
};

const mapDispatchToPropsExperience = dispatch => ({
  onRemoveExperience: expid =>
    dispatch(doRemoveExperienceWithErrorCheck(expid))
});

const ConnectedExperience = connect(null, mapDispatchToPropsExperience)(Experience);

export default ConnectedExperience;
