import { login, logout, signup } from "../members.actions";

describe("Members Actions", () => {
  it("login", () => {
    const member = {
      email: "test@test.com"
    };

    expect(login(member)).toMatchSnapshot();
  });

  it("logout", () => {
    expect(logout()).toMatchSnapshot();
  });

  it("signup", () => {
    expect(
      signup("Rainbow", "Dash", "rainbow@dash.com", "0102030405")
    ).toMatchSnapshot();
  });
});
