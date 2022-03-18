'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const {sendJson} = require(`./services/api-responses.js`);

categoriesRouter.get(`/`, (req, res) => sendJson(res, req.data.categories));

module.exports = categoriesRouter;
