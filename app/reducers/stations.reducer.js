import { combineReducers } from "redux";
import { LATE_RETURN, RENT_BIKE, RETURN_BIKE } from "../constants/actionTypes";

export const INITIAL_STATE = {
  byId: {
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
  },
  allIds: ["1", "2", "3"]
};

const byId = (state = INITIAL_STATE.byId, action) => {
  switch (action.type) {
    case RENT_BIKE:
      const rentBikeReducer = { ...state };
      rentBikeReducer[action.stationId] = {
        ...rentBikeReducer[action.stationId]
      };
      rentBikeReducer[action.stationId].bikesAvailable--;
      rentBikeReducer[action.stationId].nbFreeSlot++;
      return rentBikeReducer;

    case RETURN_BIKE:
      const returnBikeReducer = { ...state };
      returnBikeReducer[action.stationId] = {
        ...returnBikeReducer[action.stationId]
      };
      returnBikeReducer[action.stationId].bikesAvailable++;
      returnBikeReducer[action.stationId].nbFreeSlot--;
      return returnBikeReducer;

    case LATE_RETURN:
      const lateReturnBikeReducer = { ...state };
      const stationWithFreeSlots = Object.keys(lateReturnBikeReducer).find(
        stationId => lateReturnBikeReducer[stationId].nbFreeSlot > 0
      );
      lateReturnBikeReducer[stationWithFreeSlots] = {
        ...lateReturnBikeReducer[stationWithFreeSlots]
      };
      lateReturnBikeReducer[stationWithFreeSlots].bikesAvailable++;
      lateReturnBikeReducer[stationWithFreeSlots].nbFreeSlot--;
      return lateReturnBikeReducer;

    default:
      return state;
  }
};

const allIds = (state = INITIAL_STATE.allIds, action) => {
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
