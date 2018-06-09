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

import "./App.scss";
import { isConnectedMemberAlreadyBorrower } from "../../reducers/members.reducer";

export default class App {
  constructor(store) {
    this.store = store;

    this.app = document.createElement("div");
    this.app.className = "App";
    document.body.appendChild(this.app);
  }

  bindDomElements() {
    bindOnclick("#tabCustomer", () => this.render(customerTemplate));
    bindOnclick("#tabMember", () => this.render(memberTemplate));
    bindOnclick("#tabSysAdmin", this.sysAdminView.bind(this));
    bindOnSubmit("#registrationForm", this.registerCustomer.bind(this));
    bindOnclick("#memberLoginBtn", this.memberLogin.bind(this));

    bindOnclick("#logout", this.memberLogout.bind(this));
    bindOnclickForClass(".rent", this.rentBike.bind(this));

    bindOnclickForClass(".return", this.returnBike.bind(this));
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

  memberLogin() {
    try {
      const email = document.querySelector("#email");
      new Customer(email.value).checkLogin(
        this.store.getState().members.members
      );
      this.store.dispatch(login(email.value));

      // Display the correct screen once logged
      const stations = getAllStations(this.store.getState().stations);

      const template = isConnectedMemberAlreadyBorrower(
        this.store.getState().members
      )
        ? memberBikeRentedTemplate
        : memberRentalTemplate;

      this.render(template, { email: email.value, stations });
    } catch (error) {
      alert(error);
    }
  }

  memberLogout() {
    this.store.dispatch(logout());
    this.render(memberTemplate);
  }

  rentBike(evt) {
    const stationId = evt.target.getAttribute("data-id");
    const selectedStation = getStationById(
      this.store.getState().stations,
      stationId
    );

    if (selectedStation.bikesAvailable === 0) {
      alert("No bicycle available here !");
      return;
    }

    this.store.dispatch(rentBike(stationId));

    const stations = getAllStations(this.store.getState().stations);
    this.render(memberBikeRentedTemplate, {
      email: this.store.getState().members.memberConnected,
      stations
    });
  }

  returnBike(evt) {
    const stationId = evt.target.getAttribute("data-id");
    const selectedStation = getStationById(
      this.store.getState().stations,
      stationId
    );
    if (selectedStation.nbFreeSlot === 0) {
      alert("No free slot here !");
      return;
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
