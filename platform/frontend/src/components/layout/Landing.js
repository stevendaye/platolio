import React, { Fragment, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to = "/dashboard"/>
    }

    return (
      <Fragment>
        <section className="landing">
          <div className="dark-overlay">
            <div className="landing-inner">
              <h1 className="x-large">Platolio</h1>
              <p className="lead">
                Create a professional profile to share posts and get help from other professionals
              </p>
              <div className="buttons">
                <Link to = "/signup" className="btn btn-primary">
                  Sign Up
                </Link>
                <Link to = "/login" className="btn btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToPropsLanding = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

const ConnectedLanding = connect(mapStateToPropsLanding)(Landing);

export default ConnectedLanding;
