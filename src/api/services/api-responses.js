'use strict';

const {HttpCode} = require(`../constants.js`);

const sendGreeting = (res) => res.status(HttpCode.OK).send(`Wellcome to my first <b>REST API</b>`);
const sendNotFound = (res) => res.status(HttpCode.NOT_FOUND).json({error: `Not found`});
const sendBadRequest = (res) => res.status(HttpCode.BAD_REQUEST).json({error: `Bad request`});
const sendWrongPath = (res) => res.status(HttpCode.BAD_REQUEST).json({error: `Wrong path`});
const sendJson = (res, body) => res.status(HttpCode.OK).json(body);
const sendId = (res, id) => res.status(HttpCode.CREATED).json({id});
const sendNothing = (res) => res.status(HttpCode.NO_CONTENT).end();

module.exports = {
  sendGreeting,
  sendNotFound,
  sendBadRequest,
  sendWrongPath,
  sendJson,
  sendId,
  sendNothing
};
