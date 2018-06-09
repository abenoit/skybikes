import {
  LOGIN_SUCCESS,
  RENT_BIKE,
  RETURN_BIKE,
  SIGN_UP,
  LOGOUT
} from "../constants/actionTypes";

import { MAX_TIME_RENTAL_REDUX } from "../constants/application";

const INITIAL_STATE = {
  memberConnected: null,
  members: [
    {
      email: "amelie.benoit33@gmail.com",
      lastname: "BENOIT",
      firstname: "amelie",
      phone: "32332423"
    }
  ]
};

export const members = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      state.members;
      return { ...state, memberConnected: action.email };

    case LOGOUT:
      state.members;
      return { ...state, memberConnected: null };

    case SIGN_UP:
      const { firstname, lastname, email, phone } = action;
      const addNewMember = [...state.members];
      addNewMember.push({ firstname, lastname, email, phone });
      return {
        ...state,
        members: addNewMember
      };

    case RENT_BIKE:
      const newStateRent = { ...state };
      const member = newStateRent.members.find(
        member => member.email === state.memberConnected
      );
      member.rentalInfo = {
        stationId: action.stationId,
        rentalTime: new Date()
      };
      return newStateRent;

    case RETURN_BIKE:
      const newStateReturn = { ...state };
      const memberReturning = newStateReturn.members.find(
        member => member.email === state.memberConnected
      );
      const now = new Date();
      var timeDiff = Math.abs(
        now.getTime() - memberReturning.rentalInfo.rentalTime.getTime()
      );
      var diffSeconds = Math.ceil(timeDiff / 1000);
      if (diffSeconds > MAX_TIME_RENTAL_REDUX) {
        memberReturning.banned = true;
      }
      memberReturning.rentalInfo = null;

      return newStateReturn;

      const newBorrowersList = [...state.bikeBorrowers];
      newBorrowersList.filter(
        borrower => borrower.email !== state.memberConnected
      );
      return { ...state, bikeBorrowers: newBorrowersList };

    default:
      return state;
  }
};

export const isConnectedMemberAlreadyBorrower = state =>
  isMemberABorrower(state, state.memberConnected);

export const isMemberABorrower = (state, email) => {
  const memberInfo = state.members.find(member => member.email === email);
  return memberInfo && memberInfo.rentalInfo;
};
