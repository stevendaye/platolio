import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { doGetProfileByUseridWithErrorCheck } from "../../thunks/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({onGetProfileById, auth, profile: { profile, isLoading }, match}) => {
  useEffect(() => {
    onGetProfileById(match.params.id)
  }, [onGetProfileById, match.params.id]);

  return (
    <Fragment>
      { profile === null || isLoading
        ? <Spinner />
        : <Fragment>
            <Link to = "/profiles" className = "btn btn-light">
              Back To Profiles
            </Link>
            { auth.isAuthenticated && isLoading === false && auth.user._id === profile.userid._id
              && (<Link to = "/profile/edit" className = "btn btn-dark">
                Edit Profile
              </Link>)
            }
            <div className = "profile-grid my-1">
              <ProfileTop profile = { profile } />
              <ProfileAbout profile = { profile } />
              <div className = "profile-exp bg-white p-2">
                <h2 className = "text-primary">Experience</h2>
                <Fragment>
                  {profile.experience.length > 0
                    ? <Fragment>
                        {profile.experience.map(experience => (
                          <ProfileExperience
                            key = {experience._id}
                            experience = { experience }
                          />
                        ))}
                      </Fragment>
                    : (
                      <h4>No experience was added</h4>
                    )
                  }
                </Fragment>
              </div>
              <div className = "profile-edu bg-white p-2">
                <h2 className = "text-primary">Education</h2>
                <Fragment>
                  {profile.education.length > 0
                    ? <Fragment>
                        {profile.education.map(education => (
                          <ProfileEducation
                            key = {education._id}
                            education = { education }
                          />
                        ))}
                      </Fragment>
                    : (
                      <h4>No education was added</h4>
                    )
                  }
                </Fragment>
              </div>
              {profile.githubusername &&
                <ProfileGithub username = {profile.githubusername} />
              }
            </div>
          </Fragment>
      }
    </Fragment>
  )
};

Profile.propTypes = {
  onGetProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToPropsProfile = state => ({
  auth: state.authState,
  profile: state.profileState
});

const mapDispatchToProps = dispatch => ({
  onGetProfileById: id => dispatch(doGetProfileByUseridWithErrorCheck(id))
});

const ConnectedProfile = connect(mapStateToPropsProfile, mapDispatchToProps)(Profile);

export default ConnectedProfile;
