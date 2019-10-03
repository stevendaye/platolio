import axios from "axios";

const PROFILE_URL = "/users/profile";
const PROFILES_URL = "/users/profiles";
const PROFILE_BY_USERID_URL = "/users/profile/find";
const CREATE_PROFILE_URL = "/users/profile/create";
const ADD_EXPERIENCE_URL = "/users/profile/update/experience";
const ADD_EDUCATION_URL = "/users/profile/update/education";
const REMOVE_EXPERIENCE_URL = "/users/profile/remove/experience";
const REMOVE_EDUCATION_URL = "/users/profile/remove/education";
const DELETE_ACCOUNT_URL = "/users/profile/destroy";
const GITHUB_URL = "/users/auth/github";

// Create or Update Profile
const createProfile = async profileFormData => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(profileFormData);

  return await axios.post(CREATE_PROFILE_URL, body, config);
};

// Get Current Profile;
const getCurrentProfile = async () => {
  return await axios.get(PROFILE_URL);
};

// Get All Profiles
const getProfiles = async () => {
  return await axios.get(PROFILES_URL);
};

// Get Profile By Id;
const getProfileByUserid = async userid => {
  return await axios.get(`${PROFILE_BY_USERID_URL}/${userid}`);
};

// Add/Update Experience
const addExperience = async expFormData => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(expFormData);

  return await axios.put(ADD_EXPERIENCE_URL, body, config);
};

// Remove Experience
const removeExperience = async expid => {
  return await axios.delete(`${REMOVE_EXPERIENCE_URL}/${expid}`);
};

// Add/Update Education
const addEducation = async eduFormData => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(eduFormData);

  return await axios.put(ADD_EDUCATION_URL, body, config);
};

// Remove Education
const removeEducation = async eduid => {
  return await axios.delete(`${REMOVE_EDUCATION_URL}/${eduid}`);
};

// Delete whole account + profile
const deleteAccount = async () => {
  return await axios.delete(`${DELETE_ACCOUNT_URL}`);
};

const getGithubRepos = async username => {
  return await axios.get(`${GITHUB_URL}/${username}`);
};

export default getCurrentProfile;
export { getProfiles, getProfileByUserid, createProfile, addExperience,
  addEducation, removeExperience, removeEducation, deleteAccount,
  getGithubRepos
};
