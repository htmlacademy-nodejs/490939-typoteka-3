'use strict';

const {Router} = require(`express`);

class MainRouter {

  constructor(service) {
    this.instance = new Router();
    this.service = service;
    this.init();
  }

  init() {
    const {instance: router, service} = this;
    router.get(`/`, (_req, res) => service.getHomePageHandler(res));
    router.get(`/register`, (_req, res) => service.getRegisterPageHandler(res));
    router.get(`/login`, (_req, res) => service.getLoginPageHandler(res));
    router.get(`/search`, (_req, res) => service.getSearchPageHandler(res));
    router.post(`/search`, (req, res) => service.postSearchPageHandler(req, res));
  }
}

module.exports = MainRouter;
