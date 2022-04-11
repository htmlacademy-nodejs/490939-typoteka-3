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
    router.get(`/`, (_req, res) => service.getArticlesHandler(res));
    router.get(`/:articleId`, (req, res) => service.getArticleHandler(req.params, res));
    router.get(`/:articleId/comments`, (req, res) => service.getCommentsHandler(req.params, res));
    router.post(`/`, (req, res) => service.postArticleHandler(req.body, res));
    router.post(`/:articleId/comments`, (req, res) => service.postCommentHandler(req.params, req.body, res));
    router.put(`/:articleId`, (req, res) => service.putArticleHandler(req.params, req.body, res));
    router.delete(`/:articleId`, (req, res) => service.deleteArticleHandler(req.params, res));
    router.delete(`/:articleId/comments/:commentId`, (req, res) => service.deleteCommentHandler(req.params, res));
  }
}

module.exports = ArticlesRouter;
