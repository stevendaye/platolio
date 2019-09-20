/* Created fat thunks to call the register api while cheking for errors */
import registerUser, { getUser } from "../apis/register";
import doSetRemoveNotification from "../thunks/notifications";
import { doRegisterWithSuccess, doRegisterWithFailure,
  doLoadUser, doSetAuthError
} from "../actions/auth";
import setAuthTokenHeader from "../utils/setAuthTokenHeader";

// Register user in the backend and token sent back to store and local storage
const doRegisterUserWithErrorCheck = (name, email, password) => {
  return async function(dispatch) {
    try {
      const res = await registerUser(name, email, password);
      dispatch(doRegisterWithSuccess(res.data));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
      }
      dispatch(doRegisterWithFailure());
    }
  }
};

// Then loads the user info after checking if the sent token is available in the header from the local storage;
const doLoadUserWithErrorCheck = () => {
  return async function(dispatch) {
    if (localStorage.token) {
      setAuthTokenHeader(localStorage.token);
    }
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
