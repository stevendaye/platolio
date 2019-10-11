import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () =>
  <div className = "dash-buttons">
    <Link to = "/profile/edit" className = "btn btn-light">
      <i className = "fas fa-user-circle text-primary"></i> &nbsp;
      Update Profile
    </Link>
    <Link to = "/experience/add" className = "btn btn-light">
      <i className = "fab fa-black-tie text-primary"></i> &nbsp;
      Add Experience
    </Link>
    <Link to = "/education/add" className = "btn btn-light">
      <i className = "fas fa-graduation-cap text-primary"></i> &nbsp;
      Add Education
    </Link>
  </div>

export default DashboardActions;
