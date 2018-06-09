import { combineReducers } from "redux";
import { members } from "./members.reducer";
import { stations } from "./stations.reducer";

export const reducers = combineReducers({
  members,
  stations
});
