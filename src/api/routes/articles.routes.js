'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const isValidArticleBody = require(`../validators/article.validator.js`);
const isValidCommentBody = require(`../validators/comment.valiator.js`);
const {sendNotFound, sendBadRequest, sendJson, sendId, sendNothing} = require(`./api-responses.js`);
const storage = require(`../storage/storage.js`).articles;

articlesRouter.get(`/`, (_req, res) => {
  const articles = storage.getArticles();
  sendJson(res, articles);
});
articlesRouter.get(`/:articleId`, (req, res) => {
  const {articleId} = req.params;
  const article = storage.getArticleById(articleId);
  if (!article) {
    return sendNotFound(res);
  }
  return sendJson(res, article);
});
articlesRouter.get(`/:articleId/comments`, (req, res) => {
  const {articleId} = req.params;
  const article = storage.getArticleById(articleId);
  if (!article) {
    return sendNotFound(res);
  }
  return sendJson(res, article.comments);
});
articlesRouter.post(`/`, (req, res) => {
  if (!isValidArticleBody(req.body)) {
    return sendBadRequest(res);
  }
  const newArticleId = storage.addNewArticle(req.body);
  return sendId(res, newArticleId);
});
articlesRouter.post(`/:articleId/comments`, (req, res) => {
  if (!isValidCommentBody(req.body)) {
    return sendBadRequest(res);
  }
  const {articleId} = req.params;
  const newCommentId = storage.addNewCommentByArticleId(articleId, req.body);
  if (!newCommentId) {
    return sendNotFound(res);
  }
  return sendId(res, newCommentId);
});
articlesRouter.put(`/:articleId`, (req, res) => {
  if (!isValidArticleBody(req.body)) {
    return sendBadRequest(res);
  }
  const {articleId} = req.params;
  const newArticleId = storage.updateArticleById(articleId, req.body);
  if (!newArticleId) {
    return sendNotFound(res);
  }
  return sendId(res, newArticleId);
});
articlesRouter.delete(`/:articleId`, (req, res) => {
  const {articleId} = req.params;
  const removedArticleId = storage.removeArticleById(articleId);
  if (!removedArticleId) {
    return sendNotFound(res);
  }
  return sendNothing(res);
});
articlesRouter.delete(`/:articleId/comments/:commentId`, (req, res) => {
  const {articleId, commentId} = req.params;
  const removedCommentId = storage.removeCommentByArticleId(articleId, commentId);
  if (!removedCommentId) {
    return sendNotFound(res);
  }
  return sendNothing(res);
});

module.exports = articlesRouter;
