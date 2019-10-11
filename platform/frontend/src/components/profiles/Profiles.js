import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { doGetProfilesWithErrorCheck } from "../../thunks/profile";


const Profiles = ({ onGetProfiles, profiles: { profiles, isLoading } }) => {
  useEffect(() => {
    onGetProfiles();
  }, [onGetProfiles]);

  return (
    <Fragment>
      {isLoading
        ? <Spinner/>
        : <Fragment>
            <h1 className = "large text-primary" style = {{marginTop: "15px"}}>Professionals</h1>
            <p className = "lead">
              <i className = "fab fa-connectdevelop "></i> Browse and connect with Professionals
            </p>
            <div className = "profiles">
              {profiles.length > 0
                ? (profiles.map(profile => (
                  <ProfileItem
                    key = { profile._id }
                    profile = { profile }
                  />
                )))
                : <h4>
                    No profile created yet. Be the first to create one <br/>
                    <Link to = "/signup" className = "btn btn-primary my-1">
                      Create Profile
                    </Link>
                  </h4>
              }
            </div>
          </Fragment>
      }
    </Fragment>
  );
};

Profiles.propTypes = {
  onGetProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToPropsProfiles = state => ({
  profiles: state.profileState
});

const mapDispatchToPropsProfiles = dispatch => ({
  onGetProfiles: () => dispatch(doGetProfilesWithErrorCheck())
});

const ConnectedProfiles = connect(mapStateToPropsProfiles, mapDispatchToPropsProfiles)(Profiles);

export default ConnectedProfiles;
