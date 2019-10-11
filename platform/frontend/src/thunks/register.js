/* Created fat thunks to call the register api while cheking for errors */
import { doSetInvalidEntries, doSetValidEntries, doClearEntriesFeedback } from "../actions/entries";
import registerUser, { getUser } from "../apis/register";
import doSetRemoveNotification from "../thunks/notifications";
import { doRegisterSuccess, doRegisterFail, doLoadUser, doSetAuthError } from "../actions/auth";
import setAuthTokenHeader from "../utils/setAuthTokenHeader";

// Register user in the backend and token sent back to store and local storage
const doRegisterUserWithErrorCheck = (name, email, password) => {
  return async function(dispatch) {
    try {
      const res = await registerUser(name, email, password);
      dispatch(doRegisterSuccess(res.data));
      dispatch(doLoadUserWithErrorCheck());
      dispatch(doSetValidEntries("Valid Entries"));
      dispatch(doClearEntriesFeedback());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
        dispatch(doSetInvalidEntries("Invalid Entries"));
      }
      dispatch(doRegisterFail());
    }
  }
};

// Then loads the user info after checking if the sent token is available in the header from the local storage;
const doLoadUserWithErrorCheck = () => {
  if (localStorage.token) {
    setAuthTokenHeader(localStorage.token);
  }
  return async function(dispatch) {
    try {
      const res = await getUser();
      dispatch(doLoadUser(res.data));
    } catch (err) {
      dispatch(doSetAuthError());
    }
  }
};

export default doRegisterUserWithErrorCheck;
export { doLoadUserWithErrorCheck };
