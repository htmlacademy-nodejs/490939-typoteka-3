'use strict';

function isLengthBetween(valueStr, from, to) {
  return valueStr.length >= from && valueStr.length <= to;
}

function isValidDateFormat(dateStr) {
  return /[0-9]{2}\.[0-9]{2}\.[0-9]{4}, [0-9]{2}:[0-9]{2}/.test(dateStr);
}

function isValidCategory(category) {
  return Array.isArray(category) && category.length >= 1 && category.every((item) => isLengthBetween(item, 5, 30));
}

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

function isValidCommentBody(body) {

  // false в конце = mandatory
  const dateCheck = body.createdDate ? isValidDateFormat(body.createdDate) : false;
  const nameCheck = body.name ? true : false;
  const textCheck = body.text ? isLengthBetween(body.text, 1, 20) : false;
  const articleTitleCheck = body.articleTitle ? isLengthBetween(body.articleTitle, 30, 250) : false;
  const avatarCheck = body.avatar ? true : true;

  const checks = [dateCheck, nameCheck, textCheck, articleTitleCheck, avatarCheck];
  return checks.every((check) => check === true);

}

module.exports = {
  isValidArticleBody,
  isValidCommentBody
};
