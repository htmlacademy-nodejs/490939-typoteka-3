'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();
const {sendJson} = require(`./api-responses.js`);
const storage = require(`../storage/storage.js`).categories;

categoriesRouter.get(`/`, (_req, res) => {
  const categories = storage.getCategories();
  sendJson(res, categories);
});

module.exports = categoriesRouter;
