export const bindOnclick = (selector, cb) => {
  const domElt = document.querySelector(selector);
  domElt &&
    domElt.addEventListener("click", e => {
      e.preventDefault();
      cb(e);
    });
};

export const bindOnSubmit = (formSelector, cb) => {
  document.querySelector(formSelector).addEventListener("submit", e => {
    e.preventDefault();
    cb();
  });
};
