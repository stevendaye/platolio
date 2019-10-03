import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () =>
  <div className = "dash-buttons">
    <Link to = "/profile/edit" className = "btn btn-light">
      <i className = "fas fa-user-circle text-primary"></i>
      Edit Profile
    </Link>
    <Link to = "/experience/add" className = "btn btn-light">
      <i className = "fab fa-black-tie text-primary"></i>
      Add Experience
    </Link>
    <Link to = "/education/add" className = "btn btn-light">
      <i className = "fas fa-graduation-cap text-primary"></i>
      Add Education
    </Link>
  </div>

export default DashboardActions;
