export default class Station {
  constructor(station) {
    this.station = station;

    if (!this.station) {
      throw new Error("station is required");
    }
  }

  checkStationForReturningBike() {
    if (this.station.nbFreeSlot === 0) {
      throw new Error("No free slot here !");
    }
  }

  checkStationForRentingBike() {
    if (this.station.bikesAvailable === 0) {
      throw new Error("No bicycle available here !");
    }
  }
}
