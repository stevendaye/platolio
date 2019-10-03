import { GET_PROFILES, GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, 
  GET_REPOS, CREATE_PROFILE, UPDATE_PROFILE, DELETE_ACCOUNT
} from "../constants/types";

const doCreateOrUpdateProfile = payload => ({
  type: CREATE_PROFILE,
  payload
});

const doGetProfiles = payload => ({
  type: GET_PROFILES,
  payload
});

const doGetProfile = payload => ({
  type: GET_PROFILE,
  payload
});

const doSetProfileError = payload => ({
  type: PROFILE_ERROR,
  payload
});

const doClearProfile = () => ({
  type: CLEAR_PROFILE
});

const doSetAddExperience =  payload => ({
  type: UPDATE_PROFILE,
  payload
});

const doSetRemoveExperience = payload => ({
  type: UPDATE_PROFILE,
  payload
});

const doSetAddEducation = payload => ({
  type: UPDATE_PROFILE,
  payload
});

const doSetRemoveEducation = payload => ({
  type: UPDATE_PROFILE,
  payload
});

const doDeleteAccount = () => ({
  type: DELETE_ACCOUNT
});

const doGetGithubRepos = payload => ({
  type: GET_REPOS,
  payload
});

export { doCreateOrUpdateProfile, doGetProfiles, doGetProfile, doSetProfileError,
  doClearProfile, doSetAddExperience, doSetRemoveExperience, doSetAddEducation,
  doSetRemoveEducation, doDeleteAccount, doGetGithubRepos
};
