import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { members } from "./members.reducer";
import { stations } from "./stations.reducer";

export const reducers = combineReducers({
  auth,
  members,
  stations
});
