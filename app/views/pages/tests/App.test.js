import { createStore } from "redux";
import App from "../App";
import { reducers } from "../../../reducers";
// Templates
import appTemplate from "./App.mustache";
import customerTemplate from "../partials/Customer.mustache";
import loginTemplate from "../partials/Login.mustache";
import sysAdminTemplate from "../partials/SysAdmin.mustache";
import memberRentalTemplate from "../partials/memberRental.mustache";
import memberBikeRentedTemplate from "../partials/memberBikeRented.mustache";
import memberBannedTemplate from "../partials/memberBanned.mustache";

describe("App", () => {
  let app;
  let renderMock;
  const store = createStore(reducers);

  beforeEach(() => {
    app = new App(store);
    renderMock = jest.fn();
    app.render = renderMock;
  });

  describe("memberView", () => {
    it("lala", () => {
      app.memberView();
      expect(renderMock).toHaveBeenCalledWith(loginTemplate);
    });
  });
});
