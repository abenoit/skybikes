import appTemplate from "./App.mustache";

import "./app.scss";

export default class App {
  constructor() {
    this.app = document.createElement("div");
    document.body.appendChild(this.app);
  }

  render() {
    const people = { people: ["geddy", "neil", "alex"] };
    var html = appTemplate(people);
    this.app.innerHTML = html;
  }
}
