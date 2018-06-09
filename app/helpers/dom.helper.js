export const bindOnclick = (selector, cb) => {
  const domElt = document.querySelector(selector);
  domElt &&
    domElt.addEventListener("click", e => {
      e.preventDefault();
      cb(e);
    });
};

export const bindOnclickForClass = (selector, cb) => {
  const domElt = document.querySelectorAll(selector);
  if (domElt) {
    domElt.forEach(elt => {
      elt.addEventListener("click", e => {
        e.preventDefault();
        cb(e);
      });
    });
  }
};

export const bindOnSubmit = (formSelector, cb) => {
  const domElt = document.querySelector(formSelector);
  domElt &&
    domElt.addEventListener("submit", e => {
      e.preventDefault();
      cb();
    });
};
