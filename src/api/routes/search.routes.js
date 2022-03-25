'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const {sendNotFound, sendBadRequest, sendJson} = require(`./api-responses.js`);
const storage = require(`../storage/storage.js`).articles;

searchRouter.get(`/`, (req, res) => {
  const {query} = req.query;
  if (!query) {
    return sendBadRequest(res);
  }
  const articles = storage.getArticles();
  const result = articles.filter((article) => article.title.indexOf(query) !== -1);
  if (result.length) {
    return sendJson(res, result);
  }
  return sendNotFound(res);
});

module.exports = searchRouter;
