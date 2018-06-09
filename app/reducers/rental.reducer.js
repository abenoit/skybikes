import { LOGIN_SUCCESS } from "../constants/actionTypes";

export const INITIAL_STATE = {
  memberConnected: undefined,
  stations: [
    {
      id: "1",
      location: "Mont-Royal",
      bikesAvailable: 8
    },

    {
      id: "2",
      location: "Village",
      bikesAvailable: 6
    },

    {
      id: "3",
      location: "Outremont",
      bikesAvailable: 7
    }
  ]
};

export const rentalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, memberConnected: action.email };
  }
};
