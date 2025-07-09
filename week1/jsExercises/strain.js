export const keep = (list, f) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (f(list[i])) {
      result.push(list[i]);
    }
  }
  return result;
};

export const discard = (list, f) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (!f(list[i])) {
      result.push(list[i]);
    }
  }
  return result;
};