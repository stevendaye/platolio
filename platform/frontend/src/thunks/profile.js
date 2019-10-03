import { doCreateOrUpdateProfile, doGetProfile, doGetProfiles, doSetProfileError,
  doSetAddExperience, doSetRemoveExperience, doSetAddEducation, doSetRemoveEducation,
  doClearProfile, doDeleteAccount, doGetGithubRepos
} from "../actions/profile";
import getCurrentProfile, { getProfiles, createProfile, getProfileByUserid,
  addExperience, addEducation, removeExperience, removeEducation, deleteAccount,
  getGithubRepos
} from "../apis/profile";
import doSetRemoveNotification from "../thunks/notifications";

const doGetProfileWithErrorCheck = () => {
  return async function (dispatch) {
    try {
        const profile = await getCurrentProfile();
        dispatch(doGetProfile(profile.data));
    } catch (err) {
      dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doGetProfilesWithErrorCheck = () => {
  return async function (dispatch) {
    try {
        const profiles = await getProfiles();
        dispatch(doClearProfile());
        dispatch(doGetProfiles(profiles.data));
    } catch (err) {
      dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doGetProfileByUseridWithErrorCheck = userid => {
  return async function (dispatch) {
    try {
        const profile = await getProfileByUserid(userid);
        dispatch(doGetProfile(profile.data));
    } catch (err) {
      dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doCreateOrUpdateProfileWithErrorCheck = (profileFormData, history, edit = false) => {
  return async function(dispatch) {
    try {
      const profile = await createProfile(profileFormData);
      dispatch(doCreateOrUpdateProfile(profile.data));
      dispatch(doSetRemoveNotification(edit ? "Profile Updated" : "Profile Created", "success"));

      !edit && history.push("/dashboard"); // Redirect to dashboard upon creation of a profile
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
      }
      dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doAddExperienceWithErrorCheck = (expFormData, history) => {
  return async function(dispatch) {
    try {
      const profile = await addExperience(expFormData);
      dispatch(doSetAddExperience(profile.data));
      dispatch(doSetRemoveNotification("Experience Added", "success"));

      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
      }
    }
  }
};

const doAddEducationWithErrorCheck = (eduFormData, history) => {
  return async function(dispatch) {
    try {
      const profile = await addEducation(eduFormData);
      dispatch(doSetAddEducation(profile.data));
      dispatch(doSetRemoveNotification("Experience Added", "success"));

      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
      }
    }
  }
};

const doRemoveExperienceWithErrorCheck = expid => {
  return async function(dispatch) {
    try {
      const profile = await removeExperience(expid);
      dispatch(doSetRemoveExperience(profile.data));
      dispatch(doGetProfileWithErrorCheck());
      dispatch(doSetRemoveNotification("Experience Deleted", "success"));
    } catch (err) {
      dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doRemoveEducationWithErrorCheck = eduid => {
  return async function(dispatch) {
    try {
      const profile = await removeEducation(eduid);
      dispatch(doSetRemoveEducation(profile.data));
      dispatch(doGetProfileWithErrorCheck());
      dispatch(doSetRemoveNotification("Education Deleted", "success"));
    } catch (err) {
      dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

const doDeleteAccountWithErrorCheck = () => {
  return async function(dispatch) {
    if (window.confirm("ARE YOU SURE? THIS CANNOT BE UNDONE!")) {
      try {
        await deleteAccount();
        dispatch(doDeleteAccount());
        dispatch(doClearProfile());
        dispatch(doSetRemoveNotification("Account Permanently Deleted"));
      } catch (err) {
        dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
      }
    }
  }
};

const doGetGithubReposWithErrorCheck = username => {
  return async function(dispatch) {
    try {
      const repos = await getGithubRepos(username);
      dispatch(doGetGithubRepos(repos.data));
    } catch (err) {
      dispatch(doSetProfileError({ message: err.response.statusText, status: err.response.status }));
    }
  }
};

export default doGetProfileWithErrorCheck;
export {
  doGetProfilesWithErrorCheck, doGetProfileByUseridWithErrorCheck,
  doCreateOrUpdateProfileWithErrorCheck, doAddExperienceWithErrorCheck,
  doAddEducationWithErrorCheck, doRemoveExperienceWithErrorCheck,
  doRemoveEducationWithErrorCheck, doDeleteAccountWithErrorCheck,
  doGetGithubReposWithErrorCheck
};
