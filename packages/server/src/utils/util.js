const valueOrDefault = (value, defaultValue) => {
  return value ? value : defaultValue;
};
const randomDate = (start, end) => {
  return new Date(+start + Math.random() * (end - start));
};
const randomItemFromList = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const randomNumber = (from, to, fixedTo = 2) => {
  return Number(from + Math.random() * (to - from)).toFixed(fixedTo);
};
module.exports = {
  valueOrDefault,
  randomDate,
  randomItemFromList,
  randomNumber
};
