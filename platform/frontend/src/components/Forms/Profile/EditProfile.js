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
      diplaySocialLinks: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { profile: { profile, isLoading } } = this.props;

    this._isMounted && this.props.onGetCurrentProfile();

    this.setState({
      company: isLoading ? "" : profile.company,
      website: isLoading ? "" : profile.website,
      location: isLoading ? "" : profile.location,
      bio: isLoading ? "" : profile.bio,
      status: isLoading ? "" : profile.status,
      githubusername: isLoading ? "" : profile.githubusername,
      skills: isLoading ? "" : profile.skills.join(","),
      twitter: isLoading ? "" : profile.twitter,
      linkedin: isLoading ? "" : profile.linkedin,
      facebook: isLoading ? "" : profile.facebook,
      instagram: isLoading ? "" : profile.instagram,
      youtube: isLoading ? "" : profile.youtube
    });
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
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onToggle() {
    this.setState({ diplaySocialLinks: !this.state.diplaySocialLinks });
  }

  render() {
    const { company, website, location, bio, status, githubusername,
      skills, twitter, linkedin, facebook, instagram, youtube,
      diplaySocialLinks
    } = this.state;

    return(
      <Fragment>
        <h1 className = "large text-primary">
          Update Your Profile
        </h1>
        <p className = "lead">
          <i className = "fas fa-user"></i>
          Let's get some information to make your profile stand out
        </p>
        <small>* = required field</small>
        <form className = "form" onSubmit = { this.onSubmit }>
          <div className = "form-group">
            <select name = "status" value= {status} onChange = { this.onChange } >
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
            <textarea placeholder="A short bio of yourself" name="bio"
            value = {bio} onChange = { this.onChange }></textarea>
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

          <input type="submit" className="btn btn-primary my-1" />
          <Link className = "btn btn-light my-1" to = "/dashboard">Cancel</Link>
        </form>
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
