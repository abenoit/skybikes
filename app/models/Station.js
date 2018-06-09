export default class Station {
  constructor() {}

  checkStationForReturningBike(selectedStation) {
    if (selectedStation.nbFreeSlot === 0) {
      throw new Error("No free slot here !");
    }
  }

  checkStationForRentingBike(selectedStation) {
    if (selectedStation.bikesAvailable === 0) {
      throw new Error("No bicycle available here !");
    }
  }
}
