'use strict';

const path = require(`path`);
const express = require(`express`);
const formParser = require(`body-parser`).urlencoded({extended: true});
const ApiService = require(`./services/api.service.js`);
const MainService = require(`./services/main.service.js`);
const MainRouter = require(`./routes/main.routes.js`);
const MyService = require(`./services/my.service.js`);
const MyRouter = require(`./routes/my.routes.js`);
const ArticlesService = require(`./services/articles.service.js`);
const ArticlesRouter = require(`./routes/articles.routes.js`);

class App {

  constructor() {
    this.instance = express();
    this.init();
  }

  init() {
    const {instance: app} = this;

    app.use(formParser);
    app.use(express.static(path.resolve(__dirname, `./public`)));

    app.set(`views`, path.resolve(__dirname, `./templates/pages`));
    app.set(`view engine`, `pug`);

    const apiService = new ApiService();
    const mainService = new MainService(apiService);
    const mainRouter = new MainRouter(mainService);
    const myService = new MyService(apiService);
    const myRouter = new MyRouter(myService);
    const articlesService = new ArticlesService(apiService);
    const articlesRouter = new ArticlesRouter(articlesService);

    app.use(`/`, mainRouter.instance);
    app.use(`/my`, myRouter.instance);
    app.use(`/articles`, articlesRouter.instance);
    app.use((_req, res) => res.render(`404`));
    app.use((err, _req, res, _next) => {
      console.error(`Internal server error: ${err.message}\n${err.stack}`);
      res.render(`500`);
    });
  }
}


module.exports = App;
