import { LOGIN_SUCCESS, LOGOUT } from "../constants/actionTypes";

const INITIAL_STATE = {
  connectedMember: null
};

export const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { connectedMember: action.email };

    case LOGOUT:
      return { connectedMember: null };

    default:
      return state;
  }
};
