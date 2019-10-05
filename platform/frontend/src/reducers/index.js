import { combineReducers } from "redux";
import notificationsReducer from "./notifications";
import authReducer from "./auth";
import profileReducer from "./profile";
import postReducer from "./post";

const rootReducer = combineReducers({
  notificationsState: notificationsReducer,
  authState: authReducer,
  profileState: profileReducer,
  postState: postReducer
});

export default rootReducer;
