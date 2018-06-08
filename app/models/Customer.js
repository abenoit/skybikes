import { getItem, save } from "../helpers/storage.helper";

import { STORAGE_MEMBERS_KEY } from "../constants/App";

export default class Customer {
  constructor(fname, lname, email, phone) {
    this.firstname = fname.value;
    this.lastname = lname.value;
    this.email = email.value;
    this.phone = phone.value;

    this.savedMembers = getItem(STORAGE_MEMBERS_KEY) || [];

    this.checkCustomerInformation();
  }

  checkCustomerInformation() {
    if (!this.firstname || !this.lastname || !this.email || !this.phone) {
      throw new Error("All fields are required.");
    }

    const memberAlreadyExists = this.savedMembers.find(
      member =>
        member.email.toLowerCase().trim() === this.email.toLowerCase().trim()
    );

    if (memberAlreadyExists) {
      throw new Error("An account with this email already exists.");
    }
  }

  saveCustomer() {
    const { storage, savedMembers, ...memberInformation } = this;
    save(STORAGE_MEMBERS_KEY, [...this.savedMembers, memberInformation]);
  }

  login(email) {
    const member = this.savedMembers.find(member => member.email === email);
    if (!member) {
      throw new Error("member not found");
    } else {
      // TODO : construct member properties
    }
  }
}
