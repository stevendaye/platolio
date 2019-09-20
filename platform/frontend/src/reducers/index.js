import { combineReducers } from "redux";
import notificationsReducer from "./notifications";
import authReducer from "./auth";

const rootReducer = combineReducers({
  notificationsState: notificationsReducer,
  authState: authReducer
});

export default rootReducer;
