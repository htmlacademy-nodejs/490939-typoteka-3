'use strict';

const root = process.cwd();
const path = require(`path`);
const express = require(`express`);
const ApiRouter = require(`${root}/src/api/api.router.js`);
const {sendHomePage, sendWrongPath} = require(`./api.responses.js`);

class Api {

  constructor(storage) {
    this.instance = express();
    this.storage = storage;
    this.init();
  }

  init() {
    const {instance: api, storage} = this;

    api.set(`views`, path.resolve(__dirname, `./templates/pages`));
    api.set(`view engine`, `pug`);

    const apiRouter = new ApiRouter(storage);

    api.get(`/`, (_req, res) => sendHomePage(res));
    api.use(`/api`, apiRouter.instance);
    api.use((_req, res) => sendWrongPath(res));
  }
}


module.exports = Api;
