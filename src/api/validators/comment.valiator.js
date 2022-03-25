'use strict';

const {isLengthBetween, isValidDateFormat} = require(`./checks.js`);

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

module.exports = isValidCommentBody;
