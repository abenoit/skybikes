import {
  STORAGE_MEMBER_LOGGED_KEY,
  STORAGE_MEMBERS_KEY
} from "../constants/application";

export default class Customer {
  constructor(email) {
    this.email = email;

    if (!this.email) {
      throw new Error("Email is required");
    }
  }

  checkCustomerInformation(firstname, lastname, phone, savedMembers) {
    if (!firstname || !lastname || !phone) {
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
