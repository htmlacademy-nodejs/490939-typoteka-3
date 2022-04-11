'use strict';

const ID_LENGTH = 6;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOK_AUTH: 401,
  NOT_FOUND: 404,
  ERROR: 500
};

module.exports = {
  ID_LENGTH,
  HttpCode
};
