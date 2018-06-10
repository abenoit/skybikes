import { combineReducers } from "redux";
import { LATE_RETURN, RENT_BIKE, RETURN_BIKE } from "../constants/actionTypes";

const INITIAL_STATE_BY_ID = {
  "1": {
    id: "1",
    location: "Mont-Royal",
    bikesAvailable: 8,
    nbFreeSlot: 2
  },
  "2": {
    id: "2",
    location: "Village",
    bikesAvailable: 6,
    nbFreeSlot: 4
  },
  "3": {
    id: "3",
    location: "Outremont",
    bikesAvailable: 7,
    nbFreeSlot: 3
  }
};

const INITIAL_STATE_ALL_IDS = ["1", "2", "3"];

const byId = (state = INITIAL_STATE_BY_ID, action) => {
  switch (action.type) {
    case RENT_BIKE:
      const rentBikeReducer = { ...state };
      rentBikeReducer[action.stationId].bikesAvailable--;
      rentBikeReducer[action.stationId].nbFreeSlot++;
      return rentBikeReducer;

    case RETURN_BIKE:
      const returnBikeReducer = { ...state };
      returnBikeReducer[action.stationId].bikesAvailable++;
      returnBikeReducer[action.stationId].nbFreeSlot--;
      return returnBikeReducer;

    case LATE_RETURN:
      const lateReturnBikeReducer = { ...state };
      const stationWithFreeSlots = Object.keys(lateReturnBikeReducer).find(
        stationId => lateReturnBikeReducer[stationId].nbFreeSlot > 0
      );
      lateReturnBikeReducer[stationWithFreeSlots].bikesAvailable++;
      lateReturnBikeReducer[stationWithFreeSlots].nbFreeSlot--;
      return lateReturnBikeReducer;

    default:
      return state;
  }
};

const allIds = (state = INITIAL_STATE_ALL_IDS, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const stations = combineReducers({
  byId,
  allIds
});

export const getAllStations = state => state.allIds.map(id => state.byId[id]);

export const getStationById = (state, id) => state.byId[id];
