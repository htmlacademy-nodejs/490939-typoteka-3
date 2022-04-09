'use strict';

const {isLengthBetween, isValidDateFormat, isValidCategory} = require(`./checks.js`);

function isValidArticleBody(body) {

  // false в конце = mandatory
  const dateCheck = body.createdDate ? isValidDateFormat(body.createdDate) : false;
  const titleCheck = body.title ? isLengthBetween(body.title, 30, 250) : false;
  const announceCheck = body.announce ? isLengthBetween(body.announce, 30, 250) : false;
  const categoryCheck = body.category ? isValidCategory(body.category) : false;
  const fullTextCheck = body.fullText ? isLengthBetween(body.fullText, 1, 1000) : true;
  const photoCheck = body.photo ? true : true;

  const checks = [dateCheck, titleCheck, announceCheck, categoryCheck, fullTextCheck, photoCheck];
  return checks.every((check) => check === true);

}

module.exports = isValidArticleBody;
