import { REGISTER_SUCCESS, REGISTER_FAIL,
  USER_LOADED, AUTH_TOKEN_ERROR
} from "../constants/actionTypes";

const doRegisterWithSuccess = payload => {
  return {
    type: REGISTER_SUCCESS,
    payload
  }
};

const doRegisterWithFailure = () => {
  return {
    type: REGISTER_FAIL
  }
}

const doLoadUser = payload => {
  return {
    type: USER_LOADED,
    payload
  }
}

const doSetAuthError = () => {
  return {
    type: AUTH_TOKEN_ERROR
  }
}

export { doRegisterWithSuccess, doRegisterWithFailure, doLoadUser, doSetAuthError };
