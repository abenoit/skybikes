export const bindOnclick = (selector, cb) => {
  document.querySelector(selector).addEventListener("click", e => {
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
