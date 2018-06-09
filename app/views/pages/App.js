// Templates
import appTemplate from "./App.mustache";
import customerTemplate from "../partials/Customer.mustache";
import memberTemplate from "../partials/Member.mustache";
import sysAdminTemplate from "../partials/SysAdmin.mustache";
import memberRentalTemplate from "../partials/memberRental.mustache";
// Models
import Customer from "../../models/Customer";
// Actions
import {
  LOGIN_SUCCESS,
  LOGOUT,
  RENT_BIKE,
  RETURN_BIKE
} from "../../constants/actionTypes";
// Helpers
import { bindOnclick, bindOnSubmit } from "../../helpers/dom.helper";

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
    bindOnclick("#tabMember", () => this.render(memberTemplate));
    bindOnclick("#tabSysAdmin", () => this.render(sysAdminTemplate));
    bindOnSubmit("#registrationForm", this.registerCustomer);
    bindOnclick("#memberLoginBtn", this.memberLogin.bind(this));

    bindOnclick("#logout", this.memberLogout.bind(this));
    bindOnclick("#rent", this.rentBike.bind(this));
  }

  registerCustomer() {
    const registrationForm = document.querySelector("#registrationForm");
    const { fname, lname, email, phone } = registrationForm;
    let newMember;

    try {
      newMember = new Customer(email.value);
      newMember.saveCustomer(fname.value, lname.value, phone.value);
      registrationForm.submit();
    } catch (error) {
      alert(error);
    }
  }

  memberLogin() {
    try {
      const email = document.querySelector("#email");
      new Customer(email.value).login();
      this.store.dispatch({
        type: LOGIN_SUCCESS,
        email: email.value
      });
      const stations = this.store.getState().stations;
      this.render(memberRentalTemplate, { email: email.value, stations });
    } catch (error) {
      alert(error);
    }
  }

  memberLogout() {
    this.store.dispatch({
      type: LOGOUT
    });
    this.render(memberTemplate);
  }

  rentBike(evt) {
    this.store.dispatch({
      type: RENT_BIKE,
      stationId: evt.target.getAttribute("data-id")
    });
  }

  render(view = customerTemplate, data = {}) {
    this.app.innerHTML = appTemplate.render(data, { view });
    this.bindDomElements();
  }
}
