import {
  LOGIN_SUCCESS,
  RENT_BIKE,
  RETURN_BIKE,
  SIGN_UP,
  LOGOUT,
  LATE_RETURN
} from "../constants/actionTypes";

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
        stationId: action.stationId
      };
      return newStateRent;

    case LATE_RETURN:
      const newStateLate = { ...state };
      const memberLate = newStateLate.members.find(
        member => member.email === state.memberConnected
      );
      memberLate.banned = true;
      memberLate.rentalInfo = null;
      return newStateLate;

    case RETURN_BIKE:
      const newStateReturn = { ...state };
      const memberReturning = newStateReturn.members.find(
        member => member.email === state.memberConnected
      );
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

export const getConnectedMemberInfo = state => {
  return state.members.find(member => member.email === state.memberConnected);
};
