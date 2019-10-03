import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_TOKEN_ERROR,
  DELETE_ACCOUNT, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from "../constants/types";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true
}

const applyAuthenticateSuccess = (state, payload) => {
  localStorage.setItem("token", payload.token);
  return {
    ...state,
    ...payload,
    isAuthenticated: true,
    isLoading: false
  }
};

const applyLoadUser = (state, payload) => {
  return {
    ...state,
    isAuthenticated: true,
    user: payload,
    isLoading: false
  }
}

const applyAuthenticateFail = (state, payload) => {
  localStorage.removeItem("token");
  return {
    ...state,
    token: null,
    isAuthenticated: false,
    isLoading: false
  }
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return applyAuthenticateSuccess(state, payload);
    case USER_LOADED:
      return applyLoadUser(state, payload);
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_TOKEN_ERROR:
    case DELETE_ACCOUNT:
      return applyAuthenticateFail(state, payload);
    default:
      return state;
  }
}

export default authReducer;
