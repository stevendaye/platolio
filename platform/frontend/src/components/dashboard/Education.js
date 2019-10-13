import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { doRemoveEducationWithErrorCheck } from "../../thunks/profile";

const Education = ({ education, onRemoveEducation }) => {
  const educations = education;

  return (
    <Fragment>
      <div id = "top"></div>
      <h2 className = "my-2"> Education Credentials </h2>
      <table className = "table">
        <span style = {{display: "block", marginLeft: "17px"}}>
          <strong>School <span className = "hide-sm">- Degree</span> - Year</strong>
        </span>
        <tbody>
          {educations.map(edu =>
            <span style = {{display: "block"}}>
              <tr key = { edu._id }>
                <td>{edu.school}</td>
                <td className = "hide-sm">{edu.degree}</td>
                <td>
                  <Moment format = "YYYY/MM/DD">{edu.from}</Moment> -{" "}
                  {edu.to === null
                    ? "Now"
                    : <Moment format = "YYYY/MM/DD">{edu.to}</Moment>
                  }
                </td>
                <td className = "hide-sm">
                  <a href = "#top">
                    <button
                    className = "btn btn-danger" style = {{ borderRadius: "19px" }}
                    onClick = { () => { onRemoveEducation(edu._id) } }
                    >
                      <i className = "fas fa-trash-alt"></i>
                    </button>
                  </a>
                </td>
              </tr>
              <a href = "#top">
                <button
                className = "btn btn-danger btn-delete"
                onClick = { () => { onRemoveEducation(edu._id) } }
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

Education.propTypes = {
  educations: PropTypes.array,
  onRemoveEducation: PropTypes.func.isRequired
};

const mapDispatchToPropsEducation = dispatch => ({
  onRemoveEducation: eduid =>
    dispatch(doRemoveEducationWithErrorCheck(eduid))
});

const ConnectedEducation = connect(null, mapDispatchToPropsEducation)(Education);

export default ConnectedEducation;
