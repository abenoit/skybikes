import { SIGN_UP, LOGIN_SUCCESS, LOGOUT } from "../constants/actionTypes";

export const login = email => {
  return { type: LOGIN_SUCCESS, email };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const signup = (firstname, lastname, email, phone) => {
  return { type: SIGN_UP, firstname, lastname, email, phone };
};
