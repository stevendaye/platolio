import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { doCreateOrUpdateProfileWithErrorCheck } from "../../../thunks/profile";

const CreateProfile = ({ onCreateProfile, history }) => {
  var [profileFormData, onSetProfileFormData] = useState({
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
    youtube: ""
  });

  const [submitted, onSubmitted] = useState(false);
  const [diplaySocialLinks, onToggleSocialLinks] = useState(false);
  const [displayOtherStatus, onSetOtherStatus] = useState(false);
  
  const onToggle = () => onToggleSocialLinks(!diplaySocialLinks);
  const onSetOther = e => onSetOtherStatus(e.target.value === "Other" ? true : false);

  var {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    twitter,
    linkedin,
    facebook,
    instagram,
    youtube,
  } = profileFormData;

  if (status === "Other") {
    status = status;
  }

  const onChange = e => onSetProfileFormData({
    ...profileFormData,
    [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    onCreateProfile(profileFormData, history);

    if (status !== "" && skills !== "") {
      onSubmitted(true);
    }
  };

  return (
    <Fragment>
      <div className = "wrap-set-bottom">
        <h1 className = "large text-primary">
          Create Your Profile
        </h1>
        <div style = {{background: "rgba(154, 154, 154, .1)", padding: "25px", borderRadius: "4px"}}>
          <p className = "lead">
            <i className = "fas fa-user"></i>
            Let's get some information to make your profile stand out
          </p>
          <small>* = required field</small>
          <form className = "form" onSubmit = { e => onSubmit(e) }>
            <div className = "form-group">
              <select name = "status" value= {status} onChange = { e => onChange(e) || onSetOther(e) } >
              <option value = "0"> * Select Professional Status </option>
                <option value = "Full Stack Developer"> Full Stack Developer </option>
                <option value = "UX/UI Developer"> UX/UI Developer </option>
                <option value = "Frontend Developer"> Frontend Developer </option>
                <option value = "Backend Developer"> Backend Developer </option>
                <option value = "Software Developer"> Software Developer </option>
                <option value = "Junior Developer"> Junior Developer </option>
                <option value = "Senior Developer"> Senior Developer </option>
                <option value = "DevOps Engineer"> DevOps Engineer </option>
                <option value = "Manager"> Project Manager </option>
                <option value = "Electrical Engineer"> Electrical Engineer </option>
                <option value = "Security Network Engineer"> Security Network Engineer </option>
                <option value = "Student or Learning"> Student </option>
                <option value = "Accountant"> Accountant </option>
                <option value = "Secretary"> Secretary </option>
                <option value = "Medical Doctor"> Medical Doctor </option>
                <option value = "Nurse"> Nurse </option>
                <option value = "Recruiter"> Recruiter </option>
                <option value = "Instructor"> Instructor </option>
                <option value = "Intern"> Intern </option>
                <option value = "Other"> Other </option>
              </select>
              { displayOtherStatus &&
                <div className = "form-group">
                  <input type = "text" placeholder = "Please Specify!" name = "status"
                  value = {status} onChange = { e => onChange(e) } />
                </div> }
              <small className = "form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className = "form-group">
              <input type = "text" placeholder = "Company" name = "company"
              value = {company} onChange = { e => onChange(e) } />
              <small className = "form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className = "form-group">
              <input type = "text" placeholder = "Website" name = "website"
              value = {website} onChange = { e => onChange(e) } />
              <small className = "form-text">
                Could be your own or a company website
              </small>
            </div>
            <div className = "form-group">
              <input type = "text" placeholder = "Location" name = "location" 
              value = {location} onChange = { e => onChange(e) }/>
              <small className = "form-text">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className = "form-group">
              <input type = "text" placeholder = "* Skills" name = "skills" 
              value = {skills} onChange = { e => onChange(e) }/>
              <small className = "form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className = "form-group">
              <small className = "form-text">Developers Only</small>
              <input
                type = "text"
                placeholder = "If you have a github username, please provide one here!"
                name = "githubusername"
                value = {githubusername} onChange = { e => onChange(e) }/>
              <small className = "form-text">
                If you want your latest repos and a Github link, include your username
              </small>
            </div>
            <div className="form-group">
              <textarea placeholder="A short bio of yourself" name="bio" cols = "30"
              rows = "5" value = {bio} onChange = { e => onChange(e) }></textarea>
              <small className = "form-text">
                Tell us a little about yourself
              </small>
            </div>

            <div className = "my-2">
              <button onClick = { () => onToggle() }
              type = "button" className = "btn btn-dark">
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>

            { diplaySocialLinks &&
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" 
                value = {twitter} onChange = { e => onChange(e) }/>
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" 
                value = {facebook} onChange = { e => onChange(e) }/>
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" 
                value = {youtube} onChange = { e => onChange(e) }/>
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" 
                value = {linkedin} onChange = { e => onChange(e) }/>
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" 
                value = {instagram} onChange = { e => onChange(e) }/>
              </div>
            </Fragment> }

            <input
              type = {submitted ? "button" : "submit"}
              className = { submitted ? "btn btn-dim my-1" : "btn btn-primary my-1"}
              value = { submitted ? "Creating Profile..." : "Create"}
            />
            {submitted && <i className = "fas fa-circle-notch fa-spin"></i>}&nbsp;&nbsp;&nbsp;&nbsp;
            <Link className = "btn btn-dark my-1" to = "/dashboard">Go Back</Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToPropsCreateProfile = dispatch => ({
  onCreateProfile: (profileFormData, history) =>
    dispatch(doCreateOrUpdateProfileWithErrorCheck(profileFormData, history))
});

const ConnectedCreateProfile = connect(null, mapDispatchToPropsCreateProfile)(withRouter(CreateProfile));

export default ConnectedCreateProfile;
