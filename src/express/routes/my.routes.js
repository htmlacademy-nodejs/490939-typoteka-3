'use strict';

const {Router} = require(`express`);

class MyRouter {

  constructor(service) {
    this.instance = new Router();
    this.service = service;
    this.init();
  }

  init() {
    const {instance: router, service} = this;
    router.get(`/`, (_req, res) => service.getMyPageHandler(res));
    router.get(`/comments`, (_req, res) => service.getMyCommentsPageHandler(res));
    router.get(`/categories`, (_req, res) => service.getCategoriesPageHandler(res));
  }
}


module.exports = MyRouter;
