// Templates
import appTemplate from "./App.mustache";
import customerTemplate from "../partials/Customer.mustache";
import memberTemplate from "../partials/Member.mustache";
import sysAdminTemplate from "../partials/SysAdmin.mustache";
import memberRentalTemplate from "../partials/memberRental.mustache";
import memberBikeRentedTemplate from "../partials/memberBikeRented.mustache";
import memberBannedTemplate from "../partials/memberBanned.mustache";
// Actions
import {
  rentBike,
  returnBike,
  lateReturn
} from "../../actions/stations.actions";
import { login, logout, signup } from "../../actions/members.actions";
// Models
import Customer from "../../models/Customer";
import Station from "../../models/Station";
// Selectors
import {
  getAllStations,
  getStationById
} from "../../reducers/stations.reducer";
import {
  isMemberABorrower,
  getMemberInfo,
  getAllMembers
} from "../../reducers/members.reducer";
// Helpers
import {
  bindOnclick,
  bindOnSubmit,
  bindOnclickForClass
} from "../../helpers/dom.helper";
import { MAX_TIME_RENTAL } from "../../constants/application";

import "./App.scss";

export default class App {
  constructor(store) {
    this.store = store;
    this.app = document.createElement("div");
    this.app.className = "App";
    document.body.appendChild(this.app);
  }

  bindDomElements() {
    bindOnclick("#tabCustomer", () => this.render(customerTemplate));
    bindOnclick("#tabMember", this.memberView.bind(this));
    bindOnclick("#tabSysAdmin", this.sysAdminView.bind(this));
    bindOnSubmit("#registrationForm", this.registerCustomer.bind(this));
    bindOnclick("#memberLoginBtn", this.memberLogin.bind(this));

    bindOnclick("#logout", this.memberLogout.bind(this));
    bindOnclickForClass(".rent", this.rentBike.bind(this));

    bindOnclickForClass(".return", this.returnBike.bind(this));
  }

  memberView() {
    if (this.store.getState().auth.connectedMember) {
      this.displayAppropriateScreenOnceLogged();
    } else {
      this.render(memberTemplate);
    }
  }

  sysAdminView() {
    const { stations, members } = this.store.getState();
    this.render(sysAdminTemplate, {
      stations: getAllStations(stations),
      members: getAllMembers(members)
    });
  }

  registerCustomer() {
    const registrationForm = document.querySelector("#registrationForm");
    const { fname, lname, email, phone } = registrationForm;

    try {
      new Customer(email.value).checkCustomerInformation(
        fname.value,
        lname.value,
        phone.value,
        getAllMembers(this.store.getState().members)
      );
      this.store.dispatch(
        signup(fname.value, lname.value, email.value, phone.value)
      );

      alert("Account created !");
      registrationForm.reset();
    } catch (error) {
      alert(error);
    }
  }

  startTimer(duration, domElt, member) {
    var startTime = Date.now();
    const context = this;

    const timerId = setInterval(() => {
      var elapsedTime = Date.now() - startTime;
      const remainingTime = MAX_TIME_RENTAL - elapsedTime;
      domElt.innerHTML = `${remainingTime} ms remaining to return the bike`;

      if (elapsedTime > MAX_TIME_RENTAL) {
        this.store.dispatch(lateReturn(member));
        clearInterval(timerId);
        if (
          getMemberInfo(
            this.store.getState().members,
            this.store.getState().auth.connectedMember
          ).banned
        ) {
          this.render(memberBannedTemplate);
        }
      }
    }, 1);
  }

  memberLogin() {
    try {
      const email = document.querySelector("#email").value;
      new Customer(email).checkLogin(
        getAllMembers(this.store.getState().members)
      );
      this.store.dispatch(login(email));
      this.displayAppropriateScreenOnceLogged();
    } catch (error) {
      alert(error);
    }
  }

  displayAppropriateScreenOnceLogged() {
    const stations = getAllStations(this.store.getState().stations);
    const connectedMember = this.store.getState().auth.connectedMember;

    if (getMemberInfo(this.store.getState().members, connectedMember).banned) {
      this.render(memberBannedTemplate);
      return;
    }

    const template = isMemberABorrower(
      this.store.getState().members,
      connectedMember
    )
      ? memberBikeRentedTemplate
      : memberRentalTemplate;

    this.render(template, {
      email: connectedMember,
      stations
    });
  }

  memberLogout() {
    this.store.dispatch(logout());
    this.render(memberTemplate);
  }

  rentBike(evt) {
    try {
      const stationId = evt.target.getAttribute("data-id");
      const stationsStore = this.store.getState().stations;
      const connectedMember = this.store.getState().auth.connectedMember;
      const selectedStation = getStationById(stationsStore, stationId);

      new Station(selectedStation).checkStationForRentingBike();
      this.store.dispatch(rentBike(stationId, connectedMember));

      const stations = getAllStations(stationsStore);
      this.render(memberBikeRentedTemplate, {
        email: connectedMember,
        stations
      });

      this.startTimer(
        MAX_TIME_RENTAL - 1,
        document.querySelector("#timer-countdown"),
        connectedMember
      );
    } catch (e) {
      alert(e);
    }
  }

  returnBike(evt) {
    const stationId = evt.target.getAttribute("data-id");
    const stationsStore = this.store.getState().stations;
    const connectedMember = this.store.getState().auth.connectedMember;

    try {
      const selectedStation = getStationById(stationsStore, stationId);
      new Station(selectedStation).checkStationForReturningBike();
      this.store.dispatch(returnBike(stationId, connectedMember));

      const stations = getAllStations(stationsStore);
      this.render(memberRentalTemplate, {
        email: connectedMember,
        stations
      });
    } catch (e) {
      alert(e);
    }
  }

  render(view = customerTemplate, data = {}) {
    this.app.innerHTML = appTemplate.render(data, { view });
    this.bindDomElements();
  }
}
