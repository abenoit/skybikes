import { getItem, save } from "../helpers/storage.helper";

import {
  STORAGE_MEMBER_LOGGED_KEY,
  STORAGE_MEMBERS_KEY
} from "../constants/App";

export default class Customer {
  constructor(email) {
    this.email = email;

    this.savedMembers = getItem(STORAGE_MEMBERS_KEY) || [];
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

  saveCustomer(fname, lname, phone) {
    this.firstname = fname;
    this.lastname = lname;
    this.phone = phone;

    this.checkCustomerInformation();

    const { storage, savedMembers, ...memberInformation } = this;
    save(STORAGE_MEMBERS_KEY, [...this.savedMembers, memberInformation]);
  }

  login() {
    const member = this.savedMembers.find(
      member => member.email === this.email
    );
    if (member) {
      save(STORAGE_MEMBER_LOGGED_KEY, member);
    } else {
      throw new Error("member not found");
    }
  }
}
