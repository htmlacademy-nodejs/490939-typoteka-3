'use strict';

const path = require(`path`);
const express = require(`express`);
const mainRoutes = require(`./routes/main.js`);
const myRoutes = require(`./routes/my.js`);
const articlesRoutes = require(`./routes/articles.js`);

class App {

  constructor() {
    this.instance = express();
    this.init();
  }

  init() {
    const {instance: app} = this;

    app.use(express.static(path.resolve(__dirname, `./public`)));

    app.set(`views`, path.resolve(__dirname, `./templates/pages`));
    app.set(`view engine`, `pug`);

    app.use(`/`, mainRoutes);
    app.use(`/my`, myRoutes);
    app.use(`/articles`, articlesRoutes);
    app.use((_req, res) => res.status(404).send(`Wrong path...`));
  }
}


module.exports = App;
