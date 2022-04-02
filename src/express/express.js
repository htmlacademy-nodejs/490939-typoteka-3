'use strict';

const root = process.cwd();
const path = require(`path`);
const express = require(`express`);
const mainRoutes = require(`./routes/main.js`);
const myRoutes = require(`./routes/my.js`);
const articlesRoutes = require(`./routes/articles.js`);
const Api = require(`${root}/src/api/api.js`);

class App {

  constructor(storage) {
    this.instance = express();
    this.storage = storage;
    this.init();
  }

  init() {
    const {instance: app, storage} = this;

    const apiRouter = new Api(storage);

    app.use(express.static(path.resolve(__dirname, `./public`)));

    app.set(`views`, path.resolve(__dirname, `./templates/pages`));
    app.set(`view engine`, `pug`);

    app.use(`/`, mainRoutes);
    app.use(`/my`, myRoutes);
    app.use(`/articles`, articlesRoutes);
    app.use(`/api`, apiRouter.instance);

    app.on(`error`, (err) => console.error(err));
  }
}


module.exports = App;
