import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import doGetProfileWithErrorCheck from  "../../thunks/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { doDeleteAccountWithErrorCheck } from "../../thunks/profile";

const Dashboard = ({ onGetProfile, onDeleteAcount, auth : { user }, profile: { profile, isLoading } }) => {
  useEffect(() => {
    onGetProfile();
  }, [onGetProfile]);

  return (
    isLoading && profile === null
      ? <Spinner/>
      : <Fragment>
        <div className = "wrap-set-bottom">
          <div>
            <h1 className = "large text-primary" style = {{marginTop: "15px"}}> Dashboard </h1>
            <p className = "lead">
              <i className = "fas fa-user" style = {{ marginRight: "5px" }}></i>
              Welcome { user && user.name }
            </p>
          </div>

          { profile !== null
            ? <Fragment>
                <DashboardActions />
                <Experience experience = { profile.experience } />
                <Education education = {profile.education} />

                <div className = "my-2">
                  <button className = "btn btn-danger" onClick = { onDeleteAcount }>
                    <i className = "fas fa-user-minus"></i> Delete My Account
                  </button>
                </div>
              </Fragment>
            : <Fragment>
                <p>You have no profile setup. Create one to interact with other professionals</p>
                <Link to = "/profile/create" className = "btn btn-primary my-1">
                  Create Profile
                </Link>
              </Fragment>
          }
        </div>
      </Fragment>
  );
};

Dashboard.propTypes = {
  onGetProfile: PropTypes.func.isRequired,
  onDeleteAcount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapSateToPropsDashboard = state => ({
  auth: state.authState,
  profile: state.profileState
});

const mapDispatchToPropsDashboard = dispatch => ({
  onGetProfile: () => dispatch(doGetProfileWithErrorCheck()),
  onDeleteAcount: () => dispatch(doDeleteAccountWithErrorCheck())
});

const ConnectedDashboard = connect(mapSateToPropsDashboard, mapDispatchToPropsDashboard)(Dashboard);

export default ConnectedDashboard;
