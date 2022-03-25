'use strict';

const {Router} = require(`express`);
const SearchService = require(`../services/search.service.js`);

const router = new Router();
const service = new SearchService();

router.get(`/`, (req, res) => service.getSearchHandler(req.query, res));

module.exports = router;
