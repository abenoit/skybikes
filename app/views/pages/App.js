import appTemplate from "./App.mustache";
import customerTemplate from "../partials/Customer.mustache";
import memberTemplate from "../partials/Member.mustache";
import sysAdminTemplate from "../partials/SysAdmin.mustache";

import { bindOnclick, bindOnSubmit } from "../../helpers/dom.helper";

import "./App.scss";
import Customer from "../../models/Member";

export default class App {
  constructor() {
    this.app = document.createElement("div");
    this.app.className = "App";
    document.body.appendChild(this.app);
  }

  bindDomElements() {
    bindOnclick("#tabCustomer", this.bindGoToNewCustomer.bind(this));
    bindOnclick("#tabMember", this.goToMember.bind(this));
    bindOnclick("#tabSysAdmin", this.goToSysAdmin.bind(this));
    bindOnSubmit("#registrationForm", this.registerCustomer.bind(this));
  }

  bindGoToNewCustomer() {
    this.render(customerTemplate);
  }

  goToMember() {
    this.render(memberTemplate);
  }

  goToSysAdmin() {
    this.render(sysAdminTemplate);
  }

  registerCustomer() {
    const registrationForm = document.querySelector("#registrationForm");
    const { fname, lname, email, phone } = registrationForm;
    let newMember;

    try {
      newMember = new Customer(fname, lname, email, phone);
      newMember.saveCustomer();
      registrationForm.submit();
    } catch (error) {
      alert(error);
    }
  }

  render(view = customerTemplate) {
    this.app.innerHTML = appTemplate.render({}, { view });
    this.bindDomElements();
  }
}
