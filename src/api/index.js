'use strict';

const {Router} = require(`express`);
const apiRouter = new Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const articlesRoutes = require(`./routes/articles.js`);
const categoriesRoutes = require(`./routes/categories.js`);
const searchRoutes = require(`./routes/search.js`);
const {sendGreeting, sendWrongPath} = require(`./services/api-responses.js`);

apiRouter.use(jsonParser);

apiRouter.get(`/`, (_req, res) => sendGreeting(res));
apiRouter.use(`/articles`, articlesRoutes);
apiRouter.use(`/categories`, categoriesRoutes);
apiRouter.use(`/search`, searchRoutes);
apiRouter.use((_req, res) => sendWrongPath(res));

module.exports = apiRouter;
