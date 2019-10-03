import { combineReducers } from "redux";
import notificationsReducer from "./notifications";
import authReducer from "./auth";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  notificationsState: notificationsReducer,
  authState: authReducer,
  profileState: profileReducer
});

export default rootReducer;
