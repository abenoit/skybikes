import { combineReducers } from "redux";
import {
  RENT_BIKE,
  RETURN_BIKE,
  SIGN_UP,
  LATE_RETURN
} from "../constants/actionTypes";

export const INITIAL_STATE = {
  byId: {
    "amelie.benoit33@gmail.com": {
      email: "amelie.benoit33@gmail.com",
      lastname: "Benoit",
      firstname: "Amélie",
      phone: "0607080910"
    }
  },
  allIds: ["amelie.benoit33@gmail.com"]
};

const byId = (state = INITIAL_STATE.byId, action) => {
  switch (action.type) {
    case SIGN_UP:
      const { firstname, lastname, email, phone } = action;
      return {
        ...state,
        [email]: {
          email,
          lastname,
          firstname,
          phone
        }
      };

    case RENT_BIKE:
      const newStateRent = { ...state };
      newStateRent[action.email] = { ...newStateRent[action.email] };
      newStateRent[action.email].rentalInfo = {
        stationId: action.stationId
      };
      return newStateRent;

    case LATE_RETURN:
      const newStateLate = { ...state };
      if (newStateLate[action.member].rentalInfo) {
        newStateLate[action.member] = { ...newStateLate[action.member] };
        newStateLate[action.member].banned = true;
        newStateLate[action.member].rentalInfo = null;
      }
      return newStateLate;

    case RETURN_BIKE:
      const newStateReturn = { ...state };
      newStateReturn[action.email] = { ...newStateReturn[action.email] };
      newStateReturn[action.email].rentalInfo = null;
      return newStateReturn;

    default:
      return state;
  }
};

const allIds = (state = INITIAL_STATE.allIds, action) => {
  switch (action.type) {
    case SIGN_UP:
      return [...state, action.email];

    default:
      return state;
  }
};

export const members = combineReducers({
  byId,
  allIds
});

export const getAllMembers = state => state.allIds.map(id => state.byId[id]);

export const isMemberABorrower = (state, email) => {
  const memberInfo = state.byId[email];
  return memberInfo && memberInfo.rentalInfo;
};

export const getMemberInfo = (state, email) => {
  return state.byId[email];
};
