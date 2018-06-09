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

  checkCustomerInformation(firstname, lastname, phone, savedMembers) {
    if (!firstname || !lastname || !this.email || !phone) {
      throw new Error("All fields are required.");
    }

    const memberAlreadyExists = savedMembers.find(
      member =>
        member.email.toLowerCase().trim() === this.email.toLowerCase().trim()
    );

    if (memberAlreadyExists) {
      throw new Error("An account with this email already exists.");
    }
  }

  checkLogin(savedMembers) {
    const member = savedMembers.find(member => member.email === this.email);
    if (!member) {
      throw new Error("member not found");
    }
  }
}
