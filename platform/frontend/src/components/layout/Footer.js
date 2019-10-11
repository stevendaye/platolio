import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Footer = ({ profiles: { isLoading, profiles } }) => {
  const [renderStyle, onSetStyle] = useState({trigger: false, pos: "absolute", margin: "15px", show: "none"});

  useEffect(() => {
    if (window.location.pathname === "/" || window.location.pathname === "/login") {
      onSetStyle({pos: "absolute", margin: "15px", show: "block"});
    } else {
      onSetStyle({pos: "relative", margin: "15px", show: "block"});
    }
  }, renderStyle.trigger && []);

  setTimeout(() => {
    onSetStyle({trigger: true});
  }, 2000);

  const { pos, margin, show } = renderStyle;

  return (
    <Fragment>
      <div
      className = "footer"
      style = {{ position: pos, marginBottom: margin, display: show }}
      >
        <Link to = "#/policy">Privacy &amp; Policy</Link> &nbsp;&nbsp;&nbsp;
        <Link to = "#/feedback">Feedback &amp; Suggestions</Link> &nbsp;&nbsp;&nbsp;
        &copy; 2019 Platolio, All Right Reserved
      </div>
    </Fragment>
  );
};

const mapStateToPropsFooter = state => ({
  profiles: state.profileState
});

const ConnectedFooter = connect(mapStateToPropsFooter)(Footer);

export default ConnectedFooter;
