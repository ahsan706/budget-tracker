const isNotEmpty = new RegExp(/.*\S.*/);
const isNumber = new RegExp(/^-?\d*(\.(\d+)?)?$/);
const isValidDate = new RegExp(
  /^\d{4,6}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
);
export { isNotEmpty, isNumber, isValidDate };
