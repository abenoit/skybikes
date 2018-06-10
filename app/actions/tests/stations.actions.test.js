import { rentBike, returnBike, lateReturn } from "../stations.actions";

describe("Stations Actions", () => {
  const email = "test@test.com";
  it("rentBike", () => {
    const stationId = "1";
    expect(rentBike(stationId)).toMatchSnapshot();
  });

  it("returnBike", () => {
    const stationId = "1";
    expect(returnBike(stationId)).toMatchSnapshot();
  });

  it("lateReturn", () => {
    expect(lateReturn(email)).toMatchSnapshot();
  });
});
