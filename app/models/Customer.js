import Storage from "../helpers/storage.helper";

import { STORAGE_MEMBERS_KEY } from "../constants/App";

export default class Customer {
  constructor(fname, lname, email, phone) {
    this.storage = new Storage();

    this.firstname = fname.value;
    this.lastname = lname.value;
    this.email = email.value;
    this.phone = phone.value;

    const storedMembers = this.storage.getItem(STORAGE_MEMBERS_KEY);
    this.savedMembers = storedMembers ? JSON.parse(storedMembers) : [];

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
    const { firstname, lastname, email, phone } = this;
    const memberInformation = {
      firstname,
      lastname,
      email,
      phone
    };
    this.storage.save(
      STORAGE_MEMBERS_KEY,
      JSON.stringify([...this.savedMembers, memberInformation])
    );
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
