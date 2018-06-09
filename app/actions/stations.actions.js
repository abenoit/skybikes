import { RENT_BIKE, RETURN_BIKE } from "../constants/actionTypes";

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
