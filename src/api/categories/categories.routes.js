'use strict';

const {Router} = require(`express`);

class CategoriesRouter {

  constructor(service) {
    this.instance = new Router();
    this.service = service;
    this.init();
  }

  init() {
    const {instance: router, service} = this;
    router.get(`/`, (_req, res) => service.getCategoriesHandler(res));
  }
}

module.exports = CategoriesRouter;
