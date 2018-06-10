import { createStore } from "redux";
import App from "../App";
import { reducers } from "../../../reducers";
// Templates
import appTemplate from "./../App.mustache";
import customerTemplate from "../../partials/Customer.mustache";
import loginTemplate from "../../partials/Login.mustache";
import sysAdminTemplate from "../../partials/SysAdmin.mustache";
import memberRentalTemplate from "../../partials/MemberRental.mustache";
import memberBikeRentedTemplate from "../../partials/MemberBikeRented.mustache";
import memberBannedTemplate from "../../partials/MemberBanned.mustache";
// Models
import Customer from "../../../models/Customer";
import Station from "../../../models/Station";
jest.mock("../../../models/Customer");
jest.mock("../../../models/Station");
// Reducers
import * as stationsReducer from "../../../reducers/stations.reducer";
import * as membersReducer from "../../../reducers/members.reducer";
import { MAX_TIME_RENTAL } from "../../../constants/application";

describe("App", () => {
  let app;
  let renderMock;
  const store = createStore(reducers);

  beforeEach(() => {
    app = new App(store);
    renderMock = jest.fn();
    app.render = renderMock;
    Customer.mockImplementation(() => {
      return {
        checkCustomerInformation: jest.fn(),
        checkLogin: jest.fn()
      };
    });
    Station.mockImplementation(() => {
      return {
        checkStationForRentingBike: () => {},
        checkStationForReturningBike: () => {}
      };
    });
    window.alert = jest.fn();
    stationsReducer.getAllStations = jest
      .fn()
      .mockReturnValue("stationsFromReducer");
    membersReducer.getAllMembers = jest
      .fn()
      .mockReturnValue("membersFromReducer");
  });

  describe("memberView", () => {
    it("should render login template if user is not logged", () => {
      store.getState = jest
        .fn()
        .mockReturnValue({ auth: { connectedMember: undefined } });
      app.displayAppropriateScreenOnceLogged = jest.fn();

      app.memberView();

      expect(renderMock).toHaveBeenCalledWith(loginTemplate);
    });

    it("should call displayAppropriateScreenOnceLogged if member is logged", () => {
      store.getState = jest
        .fn()
        .mockReturnValue({ auth: { connectedMember: "lala" } });
      app.displayAppropriateScreenOnceLogged = jest.fn();

      app.memberView();

      expect(app.displayAppropriateScreenOnceLogged).toHaveBeenCalled();
    });
  });

  describe("sysAdminView", () => {
    it("should call render with sysAdmin view", () => {
      store.getState = jest
        .fn()
        .mockReturnValue({ stations: "stations", members: "members" });

      app.sysAdminView();

      expect(stationsReducer.getAllStations).toHaveBeenCalledWith("stations");
      expect(membersReducer.getAllMembers).toHaveBeenCalledWith("members");
      expect(renderMock).toHaveBeenCalledWith(sysAdminTemplate, {
        stations: "stationsFromReducer",
        members: "membersFromReducer"
      });
    });
  });

  describe("registerCustomer", () => {
    const resetMock = jest.fn();
    document.querySelector = jest.fn().mockReturnValue({
      fname: {
        value: "firstname"
      },
      lname: {
        value: "lastname"
      },
      email: {
        value: "email"
      },
      phone: {
        value: "phone"
      },
      reset: resetMock
    });

    it("should dispatch action and reset form", () => {
      app.store.dispatch = jest.fn();
      membersReducer.getAllMembers = jest.fn();

      app.registerCustomer();

      expect(app.store.dispatch).toHaveBeenCalledWith({
        type: "SIGN_UP",
        email: "email",
        firstname: "firstname",
        lastname: "lastname",
        phone: "phone"
      });
      expect(resetMock).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Account created !");
    });

    it("should alert an error thrown by Customer", () => {
      Customer.mockImplementation(() => {
        return {
          checkCustomerInformation: () => {
            throw new Error("lala");
          }
        };
      });
      app.registerCustomer();

      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe("memberLogin", () => {
    it("should login member if (s)he exists", () => {
      document.querySelector = jest.fn().mockReturnValue({
        value: "lala@lala.com"
      });
      app.displayAppropriateScreenOnceLogged = jest.fn();
      app.store.dispatch = jest.fn();

      app.memberLogin();

      expect(app.store.dispatch).toHaveBeenCalledWith({
        email: "lala@lala.com",
        type: "LOGIN_SUCCESS"
      });
      expect(app.displayAppropriateScreenOnceLogged).toHaveBeenCalled();
    });

    it("should alert an error of member does not exist", () => {
      Customer.mockImplementation(() => {
        return {
          checkLogin: () => {
            throw new Error("err");
          }
        };
      });

      app.memberLogin();

      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe("displayAppropriateScreenOnceLogged", () => {
    it("should render banned template if member is banned", () => {
      store.getState = jest.fn().mockReturnValue({
        stations: [],
        auth: { connectedMember: "me" }
      });
      membersReducer.getMemberInfo = jest
        .fn()
        .mockReturnValue({ banned: true });

      app.displayAppropriateScreenOnceLogged();

      expect(renderMock).toHaveBeenCalledWith(memberBannedTemplate);
    });

    it("should render memberBikeRentedTemplate if member is currently renting", () => {
      store.getState = jest.fn().mockReturnValue({
        stations: [],
        auth: { connectedMember: "me" }
      });
      document.querySelector = jest.fn().mockReturnValue(undefined);
      membersReducer.isMemberABorrower = jest.fn().mockReturnValue(true);
      membersReducer.getMemberInfo = jest.fn().mockReturnValue({});

      app.displayAppropriateScreenOnceLogged();

      expect(renderMock).toHaveBeenCalledWith(memberBikeRentedTemplate, {
        email: "me",
        stations: "stationsFromReducer"
      });
    });

    it("should render memberRentalTemplate if member is not renting", () => {
      store.getState = jest.fn().mockReturnValue({
        stations: [],
        auth: { connectedMember: "me" }
      });
      document.querySelector = jest.fn().mockReturnValue(undefined);
      membersReducer.isMemberABorrower = jest.fn().mockReturnValue(false);
      membersReducer.getMemberInfo = jest.fn().mockReturnValue({});

      app.displayAppropriateScreenOnceLogged();

      expect(renderMock).toHaveBeenCalledWith(memberRentalTemplate, {
        email: "me",
        stations: "stationsFromReducer"
      });
    });
  });

  describe("memberLogout", () => {
    it("should dispatch a logout event and render login", () => {
      app.store.dispatch = jest.fn();

      app.memberLogout();

      expect(app.store.dispatch).toHaveBeenCalledWith({
        type: "LOGOUT"
      });
      expect(renderMock).toHaveBeenCalledWith(loginTemplate);
    });
  });

  describe("rentBike", () => {
    it("should render memberBikeRentedTemplate and dispatch renting event", () => {
      document.querySelector = jest.fn().mockReturnValue("timerDiv");
      store.getState = jest.fn().mockReturnValue({
        stations: [],
        auth: {
          connectedMember: "me"
        }
      });
      stationsReducer.getStationById = jest
        .fn()
        .mockReturnValue("selectedStation");
      store.dispatch = jest.fn();
      const evt = {
        target: {
          getAttribute: () => "stationId"
        }
      };
      app.startTimer = jest.fn();

      app.rentBike(evt);

      expect(store.dispatch).toHaveBeenCalledWith({
        type: "RENT_BIKE",
        email: "me",
        stationId: "stationId"
      });
      expect(renderMock).toHaveBeenCalledWith(memberBikeRentedTemplate, {
        email: "me",
        stations: "stationsFromReducer"
      });
      expect(app.startTimer).toHaveBeenCalledWith(
        MAX_TIME_RENTAL,
        "timerDiv",
        "me"
      );
    });

    it("should alert if renting is impossible", () => {
      document.querySelector = jest.fn().mockReturnValue("timerDiv");
      store.getState = jest.fn().mockReturnValue({
        stations: [],
        auth: {
          connectedMember: "me"
        }
      });
      Station.mockImplementation(() => {
        return {
          checkStationForRentingBike: () => {
            throw new Error("err");
          }
        };
      });
      stationsReducer.getStationById = jest
        .fn()
        .mockReturnValue("selectedStation");
      const evt = {
        target: {
          getAttribute: () => "stationId"
        }
      };

      app.rentBike(evt);

      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe("returnBike", () => {
    it("should render memberRentalTemplate and dispatch returning evt", () => {
      store.getState = jest.fn().mockReturnValue({
        stations: [],
        auth: {
          connectedMember: "me"
        }
      });
      stationsReducer.getStationById = jest
        .fn()
        .mockReturnValue("selectedStation");
      store.dispatch = jest.fn();
      const evt = {
        target: {
          getAttribute: () => "stationId"
        }
      };
      app.startTimer = jest.fn();

      app.returnBike(evt);

      expect(store.dispatch).toHaveBeenCalledWith({
        type: "RETURN_BIKE",
        email: "me",
        stationId: "stationId"
      });
      expect(renderMock).toHaveBeenCalledWith(memberRentalTemplate, {
        email: "me",
        stations: "stationsFromReducer"
      });
    });

    it("should alert if returning is impossible", () => {
      store.getState = jest.fn().mockReturnValue({
        stations: [],
        auth: {
          connectedMember: "me"
        }
      });
      Station.mockImplementation(() => {
        return {
          checkStationForReturningBike: () => {
            throw new Error("err");
          }
        };
      });
      stationsReducer.getStationById = jest
        .fn()
        .mockReturnValue("selectedStation");
      const evt = {
        target: {
          getAttribute: () => "stationId"
        }
      };

      app.returnBike(evt);

      expect(window.alert).toHaveBeenCalled();
    });
  });
});
