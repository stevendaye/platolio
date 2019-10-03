import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants/types";

const doSetNotification = (id, message, alert) => {
  return {
    type: SET_NOTIFICATION,
    payload: { id, message, alert }
  }
};

const doRemoveNotification = id => {
  return {
    type: REMOVE_NOTIFICATION,
    payload: id
  }
};

export { doSetNotification, doRemoveNotification };
