const filterKeyFromObject = (object, allowed) => {
  const filtered = Object.keys(object)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  return filtered;
};
export { filterKeyFromObject };
