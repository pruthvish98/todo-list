import { combineReducers } from "redux";
import TodoReducer from "./Todo/reducer";
import AuthReducer from "./Auth/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  TodoReducer,
});

export default rootReducer;
