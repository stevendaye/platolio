import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Fragment>
        <div className = "footer">
          <Link to = "#/policy">Privacy &amp; Policy</Link> &nbsp;&nbsp;&nbsp;
          <Link to = "#/feedback">Feedback &amp; Suggestions</Link> &nbsp;&nbsp;&nbsp;
          &copy; 2019 Platolio, All Right Reserved
        </div>
      </Fragment>
    );
  }
}

const mapStateToPropsFooter = state => ({
  auth: state.authState,
  profiles: state.profileState
});

const ConnectedFooter = connect(mapStateToPropsFooter)(Footer);

export default ConnectedFooter;
