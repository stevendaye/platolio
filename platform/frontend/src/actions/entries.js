import { SET_INVALID_ENTRIES, SET_VALID_ENTRIES, CLEAR_ENTRIES_FEEDBACK } from "../constants/types";

const doSetInvalidEntries = payload => {
  return {
    type: SET_INVALID_ENTRIES,
    payload
  }
};

const doSetValidEntries = payload => {
  return {
    type: SET_VALID_ENTRIES,
    payload
  }
}

const doClearEntriesFeedback = () => {
  return {
    type: CLEAR_ENTRIES_FEEDBACK
  }
}

export { doSetInvalidEntries, doSetValidEntries, doClearEntriesFeedback };
