'use strict';

const {Router} = require(`express`);
const ArticleService = require(`../services/articles.service.js`);

const router = new Router();
const service = new ArticleService();

router.get(`/`, (_req, res) => service.getArticlesHandler(res));
router.get(`/:articleId`, (req, res) => service.getArticleHandler(req.params, res));
router.get(`/:articleId/comments`, (req, res) => service.getCommentsHandler(req.params, res));
router.post(`/`, (req, res) => service.postArticleHandler(req.body, res));
router.post(`/:articleId/comments`, (req, res) => service.postCommentHandler(req.params, req.body, res));
router.put(`/:articleId`, (req, res) => service.putArticleHandler(req.params, req.body, res));
router.delete(`/:articleId`, (req, res) => service.deleteArticleHandler(req.params, res));
router.delete(`/:articleId/comments/:commentId`, (req, res) => service.deleteCommentHandler(req.params, res));

module.exports = router;
