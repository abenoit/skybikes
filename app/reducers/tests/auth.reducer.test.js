import deepFreeze from "deep-freeze";
import { auth, INITIAL_STATE } from "../auth.reducer";
import { LOGIN_SUCCESS, LOGOUT } from "../../constants/actionTypes";

describe("Auth Reducer", () => {
  it("should return the initial state", () => {
    expect(auth(undefined, {})).toEqual(INITIAL_STATE);
  });

  describe("LOGIN_SUCCESS", () => {
    it("should set connectedMember", () => {
      const action = { type: LOGIN_SUCCESS, email: "twilight@sparkle.com" };

      deepFreeze(INITIAL_STATE);

      const result = auth(INITIAL_STATE, action);

      expect(result).toEqual({
        connectedMember: "twilight@sparkle.com"
      });
    });
  });

  describe("LOGOUT", () => {
    it("should reset connectedMember", () => {
      const action = { type: LOGOUT };

      deepFreeze(INITIAL_STATE);

      const result = auth(INITIAL_STATE, action);

      expect(result).toEqual({
        connectedMember: null
      });
    });
  });
});
