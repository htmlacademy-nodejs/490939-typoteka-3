'use strict';

const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const ArticlesService = require(`./services/articles.service.js`);
const ArticlesRouter = require(`./routes/articles.routes.js`);
const CategoriesService = require(`./services/categories.service.js`);
const CategoriesRouter = require(`./routes/categories.routes.js`);
const SearchService = require(`./services/search.service.js`);
const SearchRouter = require(`./routes/search.routes.js`);
const {sendGreeting, sendWrongPath} = require(`./services/api-responses.js`);

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
    router.get(`/`, (_req, res) => sendGreeting(res));
    router.use(`/articles`, articlesRouter.instance);
    router.use(`/categories`, categoriesRouter.instance);
    router.use(`/search`, searchRouter.instance);
    router.use((_req, res) => sendWrongPath(res));
  }
}

module.exports = Api;
