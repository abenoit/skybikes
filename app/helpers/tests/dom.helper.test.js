import { bindOnclick, bindOnclickForClass, bindOnSubmit } from "../dom.helper";

describe("DomHelper", () => {
  describe("bindOnclick", () => {
    it("should add eventlistener on domElt", () => {
      const domElt = document.createElement("div");
      domElt.setAttribute("id", "test");
      document.body.appendChild(domElt);
      const cb = jest.fn();

      bindOnclick("#test", cb);

      domElt.click();

      expect(cb).toHaveBeenCalled();
    });
  });

  describe("bindOnclickForClass", () => {
    it("should add eventlistener on domElt from class", () => {
      const domElt = document.createElement("div");
      domElt.setAttribute("class", "test");
      document.body.appendChild(domElt);
      const cb = jest.fn();

      bindOnclickForClass(".test", cb);

      domElt.click();

      expect(cb).toHaveBeenCalled();
    });
  });
});
