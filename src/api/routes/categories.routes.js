'use strict';

const {Router} = require(`express`);
const CategoriesService = require(`../services/categories.service.js`);

const router = new Router();
const service = new CategoriesService();

router.get(`/`, (_req, res) => service.getCategoriesHandler(res));

module.exports = router;
