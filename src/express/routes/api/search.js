'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const {sendNotFound, sendBadRequest, sendJson} = require(`./services/api-responses.js`);

searchRouter.get(`/`, (req, res) => {
  const {query} = req.query;
  if (!query) {
    return sendBadRequest(res);
  }
  const articles = req.data.articles;
  const result = articles.filter((article) => article.title.indexOf(query) !== -1);
  if (result.length) {
    return sendJson(res, result);
  }
  return sendNotFound(res);
});

module.exports = searchRouter;
