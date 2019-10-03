import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_TOKEN_ERROR,
  LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from "../constants/types";

// Register Action Creators
const doRegisterSuccess = payload => {
  return {
    type: REGISTER_SUCCESS,
    payload
  }
};

const doRegisterFail = () => {
  return {
    type: REGISTER_FAIL
  }
}

// Login User Action Creators
const doLoginUserSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
};

const doLoginUserFail = () => {
  return {
    type: LOGIN_FAIL
  }
};


// Load User Info Action Creators
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

// Logout user
const doLogout = () => ({
  type: LOGOUT
});

export { doRegisterSuccess, doRegisterFail, doLoadUser, doSetAuthError,
  doLoginUserSuccess, doLoginUserFail, doLogout
};
