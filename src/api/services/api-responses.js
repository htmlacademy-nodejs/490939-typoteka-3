'use strict';

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOK_AUTH: 401,
  NOT_FOUND: 404,
  ERROR: 500
};

const sendGreeting = (res) => res.status(HttpCode.OK).send(`Wellcome to my first <b>REST API</b>`);
const sendNotFound = (res) => res.status(HttpCode.NOT_FOUND).json({error: `Not found`});
const sendBadRequest = (res) => res.status(HttpCode.BAD_REQUEST).json({error: `Bad request`});
const sendWrongPath = (res) => res.status(HttpCode.BAD_REQUEST).json({error: `Wrong path`});
const sendJson = (res, body) => res.status(HttpCode.OK).json(body);
const sendCreatedId = (res, id) => res.status(HttpCode.CREATED).json({id});
const sendNothing = (res) => res.status(HttpCode.NO_CONTENT).end();

module.exports = {
  sendGreeting,
  sendNotFound,
  sendBadRequest,
  sendWrongPath,
  sendJson,
  sendCreatedId,
  sendNothing
};
