import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { doRemoveEducationWithErrorCheck } from "../../thunks/profile";

const Education = ({ education, onRemoveEducation }) => {
  const educations = education;

  return (
    <Fragment>
      <h2 className = "my-2"> Education Credentials </h2>
      <table className = "table">
        <thead>
          <tr>
            <th> School </th>
            <th className = "hide-sm"> Degree </th>
            <th className = "hide-sm"> Years </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educations.map(edu =>
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
              <td>
                <button
                className = "btn btn-danger"
                onClick = { () => { onRemoveEducation(edu._id) } }
                >
                  Delete
                </button>
              </td>
            </tr>
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
