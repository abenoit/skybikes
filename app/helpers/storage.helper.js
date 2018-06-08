export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = key => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
};
