import deepFreeze from "deep-freeze";
import {
  stations,
  INITIAL_STATE,
  getAllStations,
  getStationById
} from "../stations.reducer";
import {
  LATE_RETURN,
  RENT_BIKE,
  RETURN_BIKE
} from "../../constants/actionTypes";

describe("Stations Reducer", () => {
  it("should return the initial state", () => {
    expect(stations(undefined, {})).toEqual(INITIAL_STATE);
  });

  describe("RENT_BIKE", () => {
    it("should set the station with one more slot free and one less bike", () => {
      const action = {
        type: RENT_BIKE,
        stationId: "2"
      };
      deepFreeze(INITIAL_STATE);

      const result = stations(INITIAL_STATE, action);

      expect(result).toEqual({
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
            bikesAvailable: 5,
            nbFreeSlot: 5
          },
          "3": {
            id: "3",
            location: "Outremont",
            bikesAvailable: 7,
            nbFreeSlot: 3
          }
        },
        allIds: ["1", "2", "3"]
      });
    });
  });

  describe("RETURN_BIKE", () => {
    const action = {
      type: RETURN_BIKE,
      stationId: "3"
    };
    deepFreeze(INITIAL_STATE);

    const result = stations(INITIAL_STATE, action);

    expect(result).toEqual({
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
          bikesAvailable: 8,
          nbFreeSlot: 2
        }
      },
      allIds: ["1", "2", "3"]
    });
  });

  describe("LATE_RETURN", () => {
    it("should return the bike in the first station with free slots", () => {
      const action = {
        type: LATE_RETURN,
        stationId: "3"
      };

      const initialState = {
        byId: {
          "1": {
            id: "1",
            location: "Mont-Royal",
            bikesAvailable: 10,
            nbFreeSlot: 0
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
            bikesAvailable: 8,
            nbFreeSlot: 2
          }
        },
        allIds: ["1", "2", "3"]
      };
      deepFreeze(initialState);

      const result = stations(initialState, action);

      expect(result).toEqual({
        byId: {
          "1": {
            id: "1",
            location: "Mont-Royal",
            bikesAvailable: 10,
            nbFreeSlot: 0
          },
          "2": {
            id: "2",
            location: "Village",
            bikesAvailable: 7,
            nbFreeSlot: 3
          },
          "3": {
            id: "3",
            location: "Outremont",
            bikesAvailable: 8,
            nbFreeSlot: 2
          }
        },
        allIds: ["1", "2", "3"]
      });
    });
  });

  describe("getAllStations", () => {
    it("should return all stations", () => {
      const stations = getAllStations(INITIAL_STATE);

      expect(stations.length).toEqual(3);
      expect(stations[0]).toEqual({
        id: "1",
        location: "Mont-Royal",
        bikesAvailable: 8,
        nbFreeSlot: 2
      });
      expect(stations[1]).toEqual({
        id: "2",
        location: "Village",
        bikesAvailable: 6,
        nbFreeSlot: 4
      });
      expect(stations[2]).toEqual({
        id: "3",
        location: "Outremont",
        bikesAvailable: 7,
        nbFreeSlot: 3
      });
    });
  });

  describe("getStationById", () => {
    it("should return a station from its id", () => {
      const station = getStationById(INITIAL_STATE, "2");

      expect(station).toEqual({
        id: "2",
        location: "Village",
        bikesAvailable: 6,
        nbFreeSlot: 4
      });
    });
  });
});
