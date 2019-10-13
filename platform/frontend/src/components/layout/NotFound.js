import React, { Fragment } from "react";

const NotFound = () => 
  <Fragment>
    <div style = {{ textAlign: "center" }}>
      <h1 className = "x-large text-primary">
        <i className = "fas fa-exclamation-triangle" style ={{ display: "block" }}></i>
        Page Not Found
      </h1>
      <p className = "large">
        We are afraid, you may have taken a wrong turn. This page does not exist
      </p>
    </div>
  </Fragment>


export default NotFound;
