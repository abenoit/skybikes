// Templates
import appTemplate from "./App.mustache";
import customerTemplate from "../partials/Customer.mustache";
import memberTemplate from "../partials/Member.mustache";
import sysAdminTemplate from "../partials/SysAdmin.mustache";
import memberRentalTemplate from "../partials/memberRental.mustache";
import memberBikeRentedTemplate from "../partials/memberBikeRented.mustache";
// Actions
import { rentBike, returnBike } from "../../actions/stations.actions";
import { login, logout, signup } from "../../actions/members.actions";
// Models
import Customer from "../../models/Customer";
import Station from "../../models/Station";
// Selectors
import {
  getAllStations,
  getStationById
} from "../../reducers/stations.reducer";
// Helpers
import {
  bindOnclick,
  bindOnSubmit,
  bindOnclickForClass
} from "../../helpers/dom.helper";
import { MAX_TIME_RENTAL_FRONT } from "../../constants/application";
import { isConnectedMemberAlreadyBorrower } from "../../reducers/members.reducer";

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
    const connectedUser = this.store.getState().members.memberConnected;
    if (connectedUser) {
      this.displayAppropriateScreenOnceLogged();
    } else {
      this.render(memberTemplate);
    }
  }

  sysAdminView() {
    const { stations, members } = this.store.getState();
    this.render(sysAdminTemplate, {
      stations: getAllStations(stations),
      members: members.members
    });
  }

  registerCustomer() {
    const registrationForm = document.querySelector("#registrationForm");
    const { fname, lname, email, phone } = registrationForm;
    let newMember;

    try {
      newMember = new Customer(email.value).checkCustomerInformation(
        fname.value,
        lname.value,
        phone.value,
        this.store.getState().members.members
      );
      this.store.dispatch(
        signup(fname.value, lname.value, email.value, phone.value)
      );
      registrationForm.reset();
    } catch (error) {
      alert(error);
    }
  }

  startTimer(duration, domElt) {
    let timer = duration;
    let seconds;
    const timerId = setInterval(() => {
      seconds = parseInt(timer % 60, 10);
      domElt.innerHTML = `${seconds} seconds remaining to return the bike`;

      if (--timer < 0) {
        clearInterval(timerId);
      }
    }, 1000);
  }

  memberLogin() {
    try {
      const email = document.querySelector("#email");
      new Customer(email.value).checkLogin(
        this.store.getState().members.members
      );
      this.store.dispatch(login(email.value));
      this.displayAppropriateScreenOnceLogged();
    } catch (error) {
      alert(error);
    }
  }

  displayAppropriateScreenOnceLogged() {
    const stations = getAllStations(this.store.getState().stations);

    const template = isConnectedMemberAlreadyBorrower(
      this.store.getState().members
    )
      ? memberBikeRentedTemplate
      : memberRentalTemplate;

    this.render(template, {
      email: this.store.getState().members.memberConnected,
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
      const selectedStation = getStationById(
        this.store.getState().stations,
        stationId
      );
      new Station().checkStationForRentingBike(selectedStation);
      this.store.dispatch(rentBike(stationId));

      const stations = getAllStations(this.store.getState().stations);
      this.render(memberBikeRentedTemplate, {
        email: this.store.getState().members.memberConnected,
        stations
      });

      this.startTimer(
        MAX_TIME_RENTAL_FRONT,
        document.querySelector("#timer-countdown")
      );
    } catch (e) {
      alert(e);
    }
  }

  returnBike(evt) {
    const stationId = evt.target.getAttribute("data-id");

    try {
      const selectedStation = getStationById(
        this.store.getState().stations,
        stationId
      );
      new Station().checkStationForReturningBike(selectedStation);
    } catch (e) {
      alert(e);
    }

    this.store.dispatch(returnBike(stationId));

    const stations = getAllStations(this.store.getState().stations);
    this.render(memberRentalTemplate, {
      email: this.store.getState().members.memberConnected,
      stations
    });
  }

  render(view = customerTemplate, data = {}) {
    this.app.innerHTML = appTemplate.render(data, { view });
    this.bindDomElements();
  }
}
