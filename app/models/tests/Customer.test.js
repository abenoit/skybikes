import Customer from "../Customer";

describe("Customer", () => {
  let customer;
  beforeEach(() => {
    customer = new Customer("test@test.com");
  });

  it("should have an email as property", () => {
    customer.email = "test@test.com";
  });

  it("should throw an error if email is missing", () => {
    expect(() => {
      new Customer();
    }).toThrowError("Email is required");
  });

  describe("checkCustomerInformation", () => {
    it("should throw an error if Firstname is missing", () => {
      expect(() => {
        customer.checkCustomerInformation(null, "Pie", "phone", []);
      }).toThrowError("All fields are required.");
    });

    it("should throw an error if Lastname is missing", () => {
      expect(() => {
        customer.checkCustomerInformation("Pinkie", null, "phone", []);
      }).toThrowError("All fields are required.");
    });

    it("should throw an error if phone is missing", () => {
      expect(() => {
        customer.checkCustomerInformation("Pinkie", "Pie", null, []);
      }).toThrowError("All fields are required.");
    });

    it("should throw an error if a member with this email already exists", () => {
      expect(() => {
        customer.checkCustomerInformation("Pinkie", "Pie", "phone", [
          {
            email: "test@test.com"
          }
        ]);
      }).toThrowError("An account with this email already exists.");
    });

    it("should not throw an error if everything is ok", () => {
      expect(() => {
        customer.checkCustomerInformation("Pinkie", "Pie", "phone", []);
      }).not.toThrow();
    });
  });

  describe("checkLogin", () => {
    it("should throw an error if member does not exist", () => {
      expect(() => {
        customer.checkLogin([]);
      }).toThrowError("member not found");
    });

    it("should not throw an error if member exists", () => {
      expect(() => {
        customer.checkLogin([{ email: "test@test.com" }]);
      }).not.toThrow();
    });
  });
});
