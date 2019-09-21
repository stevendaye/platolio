import { doLoginUserSuccess, doLoginUserFail } from "../actions/auth";
import doSetRemoveNotification from "./notifications";
import { doLoadUserWithErrorCheck } from "./register";
import loginUser from "../apis/login";

const doLoginUserWithErrorCheck = (email, password) => {
  return async function(dispatch) {
    try {
      const res = await loginUser(email, password);
      dispatch(doLoginUserSuccess(res.data));
      dispatch(doLoadUserWithErrorCheck());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(doSetRemoveNotification(error.message || error.msg, "danger")));
      }
      dispatch(doLoginUserFail());
    }
  }
};

export default doLoginUserWithErrorCheck;
