import Station from "../Station";

describe("Station", () => {
  it("should create an instance with a station", () => {
    const stationInfo = {
      location: "Montreal",
      nbFreeSlot: 2,
      bikesAvailable: 5
    };

    const station = new Station(stationInfo);
    expect(station.station).toBe(stationInfo);
  });

  it("should throw an error if station info is missing", () => {
    expect(() => {
      new Station();
    }).toThrowError("station is required");
  });

  describe("checkStationForReturningBike", () => {
    it("should throw an error if no free slot is available", () => {
      const stationInfo = {
        location: "Montreal",
        nbFreeSlot: 0,
        bikesAvailable: 5
      };

      expect(() => {
        new Station(stationInfo).checkStationForReturningBike();
      }).toThrowError("No free slot here !");
    });

    it("should not throw an error if free slots are available", () => {
      const stationInfo = {
        location: "Montreal",
        nbFreeSlot: 1,
        bikesAvailable: 5
      };

      expect(() => {
        new Station(stationInfo).checkStationForReturningBike();
      }).not.toThrow();
    });
  });

  describe("checkStationForRentingBike", () => {
    it("should throw an error if no bike is available", () => {
      const stationInfo = {
        location: "Montreal",
        nbFreeSlot: 2,
        bikesAvailable: 0
      };

      expect(() => {
        new Station(stationInfo).checkStationForRentingBike();
      }).toThrowError("No bicycle available here !");
    });

    it("should not throw an error if bikes are available", () => {
      const stationInfo = {
        location: "Montreal",
        nbFreeSlot: 1,
        bikesAvailable: 5
      };

      expect(() => {
        new Station(stationInfo).checkStationForRentingBike();
      }).not.toThrow();
    });
  });
});
