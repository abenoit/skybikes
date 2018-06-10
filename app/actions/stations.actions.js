import { RENT_BIKE, RETURN_BIKE, LATE_RETURN } from "../constants/actionTypes";

export const rentBike = (stationId, email) => {
  return {
    type: RENT_BIKE,
    stationId,
    email
  };
};

export const returnBike = (stationId, email) => {
  return {
    type: RETURN_BIKE,
    stationId,
    email
  };
};

export const lateReturn = member => {
  return {
    type: LATE_RETURN,
    member
  };
};
