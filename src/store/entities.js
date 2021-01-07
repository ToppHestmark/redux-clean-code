import { combineReducers } from "redux";
import bugsReducer from "./actionTypes/bugs";
import projectsReducer from "./actionTypes/projects";
import usersReducer from "./actionTypes/users";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
});
