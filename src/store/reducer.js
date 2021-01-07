// This is the root for all actions

import { combineReducers } from "redux";
import entitiesReducer from "./entities";

export default combineReducers({
  entities: entitiesReducer,
});
