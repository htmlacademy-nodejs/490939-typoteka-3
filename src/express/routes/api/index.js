'use strict';

const {Router} = require(`express`);
const apiRouter = new Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const articlesRoutes = require(`./articles.js`);
const categoriesRoutes = require(`./categories.js`);
const searchRoutes = require(`./search.js`);
const getData = require(`./services/database.js`);
const {sendGreeting, sendWrongPath} = require(`./services/api-responses.js`);

let data;

apiRouter.use(async (req, _res, next) => {
  if (data === undefined) {
    data = await getData();
  }
  req.data = data;
  next();
});

apiRouter.use(jsonParser);

apiRouter.get(`/`, (_req, res) => sendGreeting(res));
apiRouter.use(`/articles`, articlesRoutes);
apiRouter.use(`/categories`, categoriesRoutes);
apiRouter.use(`/search`, searchRoutes);
apiRouter.use((_req, res) => sendWrongPath(res));

module.exports = apiRouter;
