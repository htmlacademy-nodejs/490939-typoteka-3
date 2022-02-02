'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => res.render(`post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`post-detail`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

module.exports = articlesRouter;
