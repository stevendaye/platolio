import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants/actionTypes";

const initialState = {};

const applySetNotification = (state, payload) => {
  const { id, message, alert } = payload;
  return { ...state, [id]: payload };
};

const applyRemoveNotification = (state, payload) => {
  const { [payload]: notificationToRemove, ...restNotifications } = state;
  return restNotifications;
};

const notificationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NOTIFICATION:
      return applySetNotification(state, payload);
    case REMOVE_NOTIFICATION:
      return applyRemoveNotification(state, payload);
    default:
      return state;
  }
}

export default notificationReducer;
