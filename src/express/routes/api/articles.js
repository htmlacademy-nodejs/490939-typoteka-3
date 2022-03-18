'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const {getNewArticle, getNewComment} = require(`./services/items-creation.js`);
const {isValidArticleBody, isValidCommentBody} = require(`./services/body-validation.js`);
const {sendNotFound, sendBadRequest, sendJson, sendCreatedId, sendNothing} = require(`./services/api-responses.js`);
const {getItem, hasItem, removeItem} = require(`../../../utils.js`);

articlesRouter.get(`/`, (req, res) => sendJson(res, req.data.articles));
articlesRouter.get(`/:articleId`, (req, res) => {
  const {articleId} = req.params;
  const article = getItem(req.data.articles, articleId);
  if (!article) {
    return sendNotFound(res);
  }
  return sendJson(res, article);
});
articlesRouter.get(`/:articleId/comments`, (req, res) => {
  const {articleId} = req.params;
  const article = getItem(req.data.articles, articleId);
  if (!article) {
    return sendNotFound(res);
  }
  return sendJson(res, article.comments);
});
articlesRouter.post(`/`, (req, res) => {
  if (!isValidArticleBody(req.body)) {
    return sendBadRequest(res);
  }
  const newArticle = getNewArticle(req.body);
  req.data.articles = [...req.data.articles, newArticle];
  return sendCreatedId(res, newArticle.id);
});
articlesRouter.post(`/:articleId/comments`, (req, res) => {
  const {articleId} = req.params;
  const article = getItem(req.data.articles, articleId);
  if (!article) {
    return sendNotFound(res);
  }
  if (!isValidCommentBody(req.body)) {
    return sendBadRequest(res);
  }
  const newComment = getNewComment(req.body);
  article.comments.push(newComment);
  return sendCreatedId(res, newComment.id);
});
articlesRouter.put(`/:articleId`, (req, res) => {
  const {articleId} = req.params;
  const articles = req.data.articles;
  const hasArticle = hasItem(articles, articleId);
  if (!hasArticle) {
    return sendNotFound(res);
  }
  if (!isValidArticleBody(req.body)) {
    return sendBadRequest(res);
  }
  const newArticle = getNewArticle(req.body, articleId);
  req.data.articles = removeItem(articles, articleId);
  req.data.articles = [...articles, newArticle];
  return sendCreatedId(res, newArticle.id);
});
articlesRouter.delete(`/:articleId`, (req, res) => {
  const {articleId} = req.params;
  const articles = req.data.articles;
  const hasArticle = hasItem(articles, articleId);
  if (!hasArticle) {
    return sendNotFound(res);
  }
  req.data.articles = removeItem(articles, articleId);
  return sendNothing(res);
});
articlesRouter.delete(`/:articleId/comments/:commentId`, (req, res) => {
  const {articleId, commentId} = req.params;
  const article = getItem(req.data.articles, articleId);
  const hasComment = hasItem(article.comments, commentId);
  if (!article || !hasComment) {
    return sendNotFound(res);
  }
  article.comments = removeItem(article.comments, commentId);
  return sendNothing(res);
});

module.exports = articlesRouter;
