'use strict';

const root = process.cwd();
const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const ArticlesService = require(`./services/articles.service.js`);
const ArticlesRouter = require(`./routes/articles.routes.js`);
const CategoriesService = require(`./services/categories.service.js`);
const CategoriesRouter = require(`./routes/categories.routes.js`);
const SearchService = require(`./services/search.service.js`);
const SearchRouter = require(`./routes/search.routes.js`);
const {sendGreeting, sendWrongPath, sendError} = require(`./services/api-responses.js`);
const {getApiLogger} = require(`${root}/src/logger.js`);

const apiLogger = getApiLogger();

class Api {

  constructor(storage) {
    this.instance = new Router();
    this.storage = storage;
    this.init();
  }

  init() {
    const {instance: router, storage} = this;
    const articlesService = new ArticlesService(storage.articles);
    const categoriesService = new CategoriesService(storage.categories);
    const searchService = new SearchService(storage.articles);
    const articlesRouter = new ArticlesRouter(articlesService);
    const categoriesRouter = new CategoriesRouter(categoriesService);
    const searchRouter = new SearchRouter(searchService);
    router.use(jsonParser);
    router.use((req, res, next) => {
      apiLogger.debug(`Request to url ${req.url}`);
      res.on(`finish`, () => apiLogger.info(`Response status code: ${res.statusCode}`));
      next();
    });
    router.get(`/`, (_req, res) => sendGreeting(res));
    router.use(`/articles`, articlesRouter.instance);
    router.use(`/categories`, categoriesRouter.instance);
    router.use(`/search`, searchRouter.instance);
    router.use((req, res) => {
      apiLogger.error(`Request to wrong url ${req.url}`);
      sendWrongPath(res);
    });
    router.use((err, _req, _res, _next) => {
      apiLogger.error(`Caught error: ${err.stack}`);
      sendError();
    });
  }
}

module.exports = Api;
