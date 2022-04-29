'use strict';

const {Router} = require(`express`);

class ArticlesRouter {

  constructor(service) {
    this.instance = new Router();
    this.service = service;
    this.init();
  }

  init() {
    const {instance: router, service} = this;
    router.get(`/add`, (_req, res) => service.getAddArticlePageHandler(res));
    router.post(`/add`, (req, res) => service.postArticleHandler(req, res));
    router.get(`/:articleId`, (req, res) => service.getArticlePageHandler(req.params, res));
    router.get(`/edit/:articleId`, (req, res) => service.getEditArticlePageHandler(req.params, res));
    router.get(`/category/:id`, (_req, res) => service.getCategoryPageHandler(res));
  }
}

module.exports = ArticlesRouter;
