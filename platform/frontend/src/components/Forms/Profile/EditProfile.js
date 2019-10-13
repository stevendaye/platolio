import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { doCreateOrUpdateProfileWithErrorCheck } from "../../../thunks/profile";
import doGetProfileWithErrorCheck from "../../../thunks/profile";

class EditProfile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      website: "",
      location: "",
      bio: "",
      status: "",
      githubusername: "",
      skills: "",
      twitter: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      youtube: "",
      diplaySocialLinks: false,
      displayOtherStatus: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeOther = this.onChangeOther.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { profile: { profile, isLoading } } = this.props;

    this._isMounted && this.props.onGetCurrentProfile();

    this.setState({
      company: isLoading ? "" : (profile.company ? profile.company : ""),
      website: isLoading ? "" : (profile.website ? profile.website : ""),
      location: isLoading ? "" : (profile.location ? profile.location : ""),
      bio: isLoading ? "" : (profile.bio ? profile.bio : ""),
      status: isLoading ? "" : (profile.status ? profile.status : ""),
      githubusername: isLoading ? "" : (profile.githubusername ? profile.githubusername : ""),
      skills: isLoading ? "" : (profile.skills ? profile.skills.join(",") : ""),
      twitter: isLoading ? "" : (profile.twitter ? profile.twitter : ""),
      linkedin: isLoading ? "" : (profile.linkedin ? profile.linkedin : ""),
      facebook: isLoading ? "" : (profile.facebook ? profile.facebook : ""),
      instagram: isLoading ? "" : (profile.instagram ? profile.instagram : ""),
      youtube: isLoading ? "" : (profile.youtube ? profile.youtube : "")
    });

    if (
      !isLoading && (profile.status !== "Full Stack Developer" && profile.status !== "UX/UI Developer"
      && profile.status !== "Frontend Developer" && profile.status !== "Backend Developer"
      && profile.status !== "Software Developer" && profile.status !== "Junior Developer"
      && profile.status !== "Senior Developer" && profile.status !== "DevOps Engineer"
      && profile.status !== "Manager" && profile.status !== "Student or Learning"
      && profile.status !== "Instructor"
      )) {
        this.setState({ displayOtherStatus: true });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSubmit(e) {
    e.preventDefault();

    const { company, website, location, bio, status, githubusername,
      skills, twitter, linkedin, facebook, instagram, youtube
    } = this.state;
    const profileFormData = { company, website, location, bio, status, githubusername,
      skills, twitter, linkedin, facebook, instagram, youtube };
    const { history } = this.props;

    this.props.onCreateProfile(profileFormData, history);

    (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value === "Other") {
      this.setState({ displayOtherStatus: true });
    } else {
      this.setState({ displayOtherStatus: false });
    }
  }

  onChangeOther(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onToggle() {
    this.setState({ diplaySocialLinks: !this.state.diplaySocialLinks });
  }

  render() {
    var { company, website, location, bio, status, githubusername,
      skills, twitter, linkedin, facebook, instagram, youtube,
      diplaySocialLinks, displayOtherStatus
    } = this.state;

    if (status === "Other") {
      status = status;
    }

    return(
      <Fragment>
        <div className = "wrap-set-bottom">
          <h1 className = "large text-primary" ref = { el => this.top = el}>
            Update Your Profile
          </h1>
          <div style = {{background: "rgba(154, 154, 154, .1)", padding: "25px", borderRadius: "4px"}}>
            <p className = "lead">
              <i className = "fas fa-user"></i>&nbsp;
              Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className = "form" onSubmit = { this.onSubmit }>
              <div className = "form-group">
                <select name = "status" value= {status} onChange = { this.onChange }>
                  <option value = "0"> * Select Professional Status </option>
                  <option value = "Full Stack Developer"> Full Stack Developer </option>
                  <option value = "UX/UI Developer"> UX/UI Developer </option>
                  <option value = "Frontend Developer"> Frontend Developer </option>
                  <option value = "Backend Developer"> Backend Developer </option>
                  <option value = "Software Developer"> Software Developer </option>
                  <option value = "Junior Developer"> Junior Developer </option>
                  <option value = "Senior Developer"> Senior Developer </option>
                  <option value = "DevOps Engineer"> DevOps Engineer </option>
                  <option value = "Manager"> Manager </option>
                  <option value = "Student or Learning"> Student or Learning </option>
                  <option value = "Instructor"> Instructor or Teacher </option>
                  <option value = "Intern"> Intern </option>
                  <option value = "Other"> Other </option>
                </select>
                { displayOtherStatus &&
                  <div className = "form-group">
                    <input type = "text" placeholder = "Please Specify!" name = "status"
                    value = {status} onChange = { this.onChangeOther } />
                  </div> }
                <small className = "form-text">
                  Give us an idea of where you are at in your career
                </small>
              </div>
              <div className = "form-group">
                <input type = "text" placeholder = "Company" name = "company"
                value = {company} onChange = { this.onChange } />
                <small className = "form-text">
                  Could be your own company or one you work for
                </small>
              </div>
              <div className = "form-group">
                <input type = "text" placeholder = "Website" name = "website"
                value = {website} onChange = { this.onChange } />
                <small className = "form-text">
                  Could be your own or a company website
                </small>
              </div>
              <div className = "form-group">
                <input type = "text" placeholder = "Location" name = "location" 
                value = {location} onChange = { this.onChange }/>
                <small className = "form-text">
                  City & state suggested (eg. Boston, MA)
                </small>
              </div>
              <div className = "form-group">
                <input type = "text" placeholder = "* Skills" name = "skills" 
                value = {skills} onChange = { this.onChange }/>
                <small className = "form-text">
                  Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                </small>
              </div>
              <div className = "form-group">
                <input
                  type = "text"
                  placeholder = "Github Username"
                  name = "githubusername"
                  value = {githubusername} onChange = { this.onChange }/>
                <small className = "form-text">
                  If you want your latest repos and a Github link, include your username
                </small>
              </div>
              <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" cols = "30"
                rows = "5" value = {bio} onChange = { this.onChange }></textarea>
                <small className = "form-text">
                  Tell us a little about yourself
                </small>
              </div>

              <div className = "my-2">
                <button onClick = { this.onToggle }
                type = "button" className = "btn btn-light">
                  Add Social Network Links
                </button>
                <span>Optional</span>
              </div>

              { diplaySocialLinks &&
              <Fragment>
                <div className="form-group social-input">
                  <i className="fab fa-twitter fa-2x"></i>
                  <input type="text" placeholder="Twitter URL" name="twitter" 
                  value = {twitter} onChange = { this.onChange }/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-facebook fa-2x"></i>
                  <input type="text" placeholder="Facebook URL" name="facebook" 
                  value = {facebook} onChange = { this.onChange }/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-youtube fa-2x"></i>
                  <input type="text" placeholder="YouTube URL" name="youtube" 
                  value = {youtube} onChange = { this.onChange }/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <input type="text" placeholder="Linkedin URL" name="linkedin" 
                  value = {linkedin} onChange = { this.onChange }/>
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-instagram fa-2x"></i>
                  <input type="text" placeholder="Instagram URL" name="instagram" 
                  value = {instagram} onChange = { this.onChange }/>
                </div>
              </Fragment> }
              
              <input
                type = "submit"
                className = "btn btn-primary my-1"
                value = "Update"
              />
            <Link className = "btn btn-dark my-1" to = "/dashboard">Go Back</Link>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
  onGetCurrentProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapDispatchToPropsEditProfile = dispatch => ({
  onCreateProfile: (profileFormData, history) =>
    dispatch(doCreateOrUpdateProfileWithErrorCheck(profileFormData, history, true)),
  onGetCurrentProfile: () =>
    dispatch(doGetProfileWithErrorCheck())
});

const mapStateToPropsEditProfile = state => ({
  profile: state.profileState
});

const ConnectedEditProfile = connect(mapStateToPropsEditProfile, mapDispatchToPropsEditProfile)(withRouter(EditProfile));

export default ConnectedEditProfile;
