'use strict';

function isLengthBetween(valueStr, from, to) {
  return valueStr.length >= from && valueStr.length <= to;
}

function isValidDateFormat(dateStr) {
  return /[0-9]{2}\.[0-9]{2}\.[0-9]{4}, [0-9]{2}:[0-9]{2}/.test(dateStr);
}

function isValidCategory(category) {
  return Boolean(Array.isArray(category) && category.length >= 1 && category.every((item) => isLengthBetween(item, 5, 30)));
}

module.exports = {
  isLengthBetween,
  isValidDateFormat,
  isValidCategory
};
