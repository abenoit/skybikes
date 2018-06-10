import { RENT_BIKE, RETURN_BIKE, LATE_RETURN } from "../constants/actionTypes";

export const rentBike = stationId => {
  return {
    type: RENT_BIKE,
    stationId
  };
};

export const returnBike = stationId => {
  return {
    type: RETURN_BIKE,
    stationId
  };
};

export const lateReturn = member => {
  return {
    type: LATE_RETURN,
    member
  };
};
