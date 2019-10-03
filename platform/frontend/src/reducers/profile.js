import { GET_PROFILES, GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE,
  CREATE_PROFILE, GET_REPOS
} from "../constants/types"

const initialSate = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {}
};

const doApplyGetAllProfiles = (state, payload) => ({
  ...state,
  profiles: payload,
  isLoading: false
});

const doApplyGetProfile = (state, payload) => ({
  ...state,
  profile: payload,
  isLoading: false,
  error: {}
});

const doApplyProfileError = (state, payload) => ({
  ...state,
  profile: null,
  repos: [],
  isLoading: false,
  error: payload
});

const doApplyClearProfile = state => ({
  ...state,
  profile: null,
  repos: [],
  isLoading: false,
  error: {}
});

const doApplyGetGithubRepos = (state, payload) => ({
  ...state,
  repos: payload,
  isLoading: false
});

const profileReducer = (state = initialSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILES:
      return doApplyGetAllProfiles(state, payload);
    case CREATE_PROFILE:
    case GET_PROFILE:
      return doApplyGetProfile(state, payload);
    case PROFILE_ERROR:
      return doApplyProfileError(state, payload);
    case CLEAR_PROFILE:
      return doApplyClearProfile(state)
    case GET_REPOS:
      return doApplyGetGithubRepos(state, payload);
    default:
      return state;
  }
}

export default profileReducer;
