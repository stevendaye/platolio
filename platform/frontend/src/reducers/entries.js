import { SET_INVALID_ENTRIES, SET_VALID_ENTRIES, CLEAR_ENTRIES_FEEDBACK } from "../constants/types";

const initialState = {
  isAuthenticating: false,
  message: null,
  isLoading: false
};

const doApplySetInvalidEntries = (state, payload) => {
  return {
    ...state,
    isAuthenticating: true,
    message: payload
  };
};

const doApplySetValidEntries = (state, payload) => {
  return {
    ...state,
    isAuthenticating: true,
    isLoading: true,
    message: payload
  }
};

const doApplyClearEntriesFeedack = (state, payload) => {
  return {
    ...state,
    isAuthenticating: false,
    isLoading: false,
    message: null
  }
}

const entriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INVALID_ENTRIES:
      return doApplySetInvalidEntries(state, payload);
    case SET_VALID_ENTRIES:
      return doApplySetValidEntries(state, payload);
    case CLEAR_ENTRIES_FEEDBACK:
      return doApplyClearEntriesFeedack(state, payload);
    default:
      return state;
  }
};

export default entriesReducer;
