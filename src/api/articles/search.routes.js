'use strict';

const {Router} = require(`express`);

class SearchRouter {

  constructor(service) {
    this.instance = new Router();
    this.service = service;
    this.init();
  }

  init() {
    const {instance: router, service} = this;
    router.get(`/`, (req, res) => service.getSearchHandler(req.query, res));
  }
}

module.exports = SearchRouter;
