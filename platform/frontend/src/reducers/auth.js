import { REGISTER_SUCCESS, REGISTER_FAIL,
  USER_LOADED, AUTH_TOKEN_ERROR
} from "../constants/actionTypes";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false
}

const applyRegisterSuccess = (state, payload) => {
  localStorage.setItem("token", payload.token);
  return {
    ...state,
    ...payload,
    isAuthenticated: true
  }
};

const applyLoadUserInSotre = (state, payload) => {
  return {
    ...state,
    isAuthenticated: true,
    user: payload
  }
}

const applyRegisterFail = (state, payload) => {
  localStorage.removeItem("token");
  return {
    ...state,
    token: null,
    isAuthenticated: false
  }
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
      return applyRegisterSuccess(state, payload);
    case USER_LOADED:
      return applyLoadUserInSotre(state, payload);
    case REGISTER_FAIL:
    case AUTH_TOKEN_ERROR:
      return applyRegisterFail(state, payload);
    default:
      return state;
  }
}

export default authReducer;
