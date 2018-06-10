import deepFreeze from "deep-freeze";
import {
  members,
  INITIAL_STATE,
  getAllMembers,
  isMemberABorrower,
  getMemberInfo
} from "../members.reducer";
import {
  RENT_BIKE,
  RETURN_BIKE,
  SIGN_UP,
  LATE_RETURN
} from "../../constants/actionTypes";

describe("Members Reducer", () => {
  it("should return the initial state", () => {
    expect(members(undefined, {})).toEqual(INITIAL_STATE);
  });

  describe("SIGN_UP", () => {
    it("should add the member", () => {
      const action = {
        type: SIGN_UP,
        firstname: "twilight",
        lastname: "sparkle",
        phone: "0910392942",
        email: "twilight@sparkle.com"
      };

      deepFreeze(INITIAL_STATE);

      const result = members(INITIAL_STATE, action);

      expect(result).toEqual({
        byId: {
          "amelie.benoit33@gmail.com": {
            email: "amelie.benoit33@gmail.com",
            lastname: "Benoit",
            firstname: "Amélie",
            phone: "0607080910"
          },
          "twilight@sparkle.com": {
            email: "twilight@sparkle.com",
            lastname: "sparkle",
            firstname: "twilight",
            phone: "0910392942"
          }
        },
        allIds: ["amelie.benoit33@gmail.com", "twilight@sparkle.com"]
      });
    });
  });

  describe("RENT_BIKE", () => {
    it("should set rentalInfo for corresponding renter", () => {
      const action = {
        type: RENT_BIKE,
        stationId: "1",
        email: "amelie.benoit33@gmail.com"
      };

      deepFreeze(INITIAL_STATE);

      const result = members(INITIAL_STATE, action);

      expect(result).toEqual({
        byId: {
          "amelie.benoit33@gmail.com": {
            email: "amelie.benoit33@gmail.com",
            lastname: "Benoit",
            firstname: "Amélie",
            phone: "0607080910",
            rentalInfo: {
              stationId: "1"
            }
          }
        },
        allIds: ["amelie.benoit33@gmail.com"]
      });
    });
  });

  describe("RETURN_BIKE", () => {
    it("should reset rental information", () => {
      const action = {
        type: RETURN_BIKE,
        email: "amelie.benoit33@gmail.com"
      };

      const initialState = {
        byId: {
          "amelie.benoit33@gmail.com": {
            email: "amelie.benoit33@gmail.com",
            lastname: "Benoit",
            firstname: "Amélie",
            phone: "0607080910",
            rentalInfo: {
              stationId: "1"
            }
          }
        },
        allIds: ["amelie.benoit33@gmail.com"]
      };

      deepFreeze(INITIAL_STATE);

      const result = members(INITIAL_STATE, action);

      expect(result).toEqual({
        byId: {
          "amelie.benoit33@gmail.com": {
            email: "amelie.benoit33@gmail.com",
            lastname: "Benoit",
            firstname: "Amélie",
            phone: "0607080910",
            rentalInfo: null
          }
        },
        allIds: ["amelie.benoit33@gmail.com"]
      });
    });
  });

  describe("LATE_RETURN", () => {
    it("should return state as is if user was not currently renting", () => {
      const action = {
        type: LATE_RETURN,
        member: "amelie.benoit33@gmail.com"
      };

      deepFreeze(INITIAL_STATE);

      const result = members(INITIAL_STATE, action);

      expect(result).toEqual(INITIAL_STATE);
    });

    it("should set ban the user if rental info is set", () => {
      const action = {
        type: LATE_RETURN,
        member: "amelie.benoit33@gmail.com"
      };

      const initialState = {
        byId: {
          "amelie.benoit33@gmail.com": {
            email: "amelie.benoit33@gmail.com",
            lastname: "Benoit",
            firstname: "Amélie",
            phone: "0607080910",
            rentalInfo: {
              stationId: "1"
            }
          }
        },
        allIds: ["amelie.benoit33@gmail.com"]
      };

      deepFreeze(initialState);

      const result = members(initialState, action);

      expect(result).toEqual({
        byId: {
          "amelie.benoit33@gmail.com": {
            email: "amelie.benoit33@gmail.com",
            lastname: "Benoit",
            firstname: "Amélie",
            phone: "0607080910",
            rentalInfo: null,
            banned: true
          }
        },
        allIds: ["amelie.benoit33@gmail.com"]
      });
    });
  });

  describe("getAllMembers", () => {
    it("should return an array of all members", () => {
      const members = getAllMembers(INITIAL_STATE);

      expect(members.length).toEqual(1);
      expect(members[0]).toEqual({
        email: "amelie.benoit33@gmail.com",
        lastname: "Benoit",
        firstname: "Amélie",
        phone: "0607080910"
      });
    });
  });

  describe("isMemberABorrower", () => {
    it("should return undefined if member is not found", () => {
      const isRenting = isMemberABorrower(INITIAL_STATE, "lala");

      expect(isRenting).toBeUndefined();
    });

    it("should return undefined if member is not renting", () => {
      const state = {
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

      const isRenting = isMemberABorrower(state, "amelie.benoit33@gmail.com");

      expect(isRenting).toEqual(undefined);
    });

    it("should return rentalInfo if member is currently renting", () => {
      const state = {
        byId: {
          "amelie.benoit33@gmail.com": {
            email: "amelie.benoit33@gmail.com",
            lastname: "Benoit",
            firstname: "Amélie",
            phone: "0607080910",
            rentalInfo: {
              stationId: "1"
            }
          }
        },
        allIds: ["amelie.benoit33@gmail.com"]
      };

      const isRenting = isMemberABorrower(state, "amelie.benoit33@gmail.com");

      expect(isRenting).toEqual({
        stationId: "1"
      });
    });
  });

  describe("getMemberInfo", () => {
    it("should return undefined if member does not exist", () => {
      const member = getMemberInfo(INITIAL_STATE, "john@doe.com");

      expect(member).toEqual(undefined);
    });

    it("should return member from its id", () => {
      const member = getMemberInfo(INITIAL_STATE, "amelie.benoit33@gmail.com");

      expect(member).toEqual({
        email: "amelie.benoit33@gmail.com",
        lastname: "Benoit",
        firstname: "Amélie",
        phone: "0607080910"
      });
    });
  });
});
