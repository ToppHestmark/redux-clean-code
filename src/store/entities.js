import { combineReducers } from "redux";
import bugsReducer from "./actions/bugs";
import projectsReducer from "./actions/projects";
import usersReducer from "./actions/users";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
});
