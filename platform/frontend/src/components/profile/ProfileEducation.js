import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ education: { school, degree, fieldofstudy, current, to, from, description } }) =>
  <div>
    <h3 className = "text-dark">{school}</h3>
    <p>
      <Moment format = "YYYY/MM/DD">{from}</Moment> -{" "}
      {!to
        ? "Now"
        : <Moment format = "YYYY/MM/DD">{to}</Moment>
      }
    </p>
    <p>
      <b>Degree: </b> {degree}
    </p>
    <p>
      <b>Field Of Study: </b> {fieldofstudy}
    </p>
    <p>
      <b>Description: </b> {description}
    </p>
  </div>;

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEducation;
