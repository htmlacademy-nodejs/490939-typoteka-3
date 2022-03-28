'use strict';

const isValidArticleBody = require(`../validators/article.validator.js`);
const isValidCommentBody = require(`../validators/comment.valiator.js`);
const {sendNotFound, sendBadRequest, sendJson, sendId, sendNothing} = require(`./api-responses.js`);
const storage = require(`../storage/storage.js`);

class ArticleService {

  constructor() {
    this.storage = storage.articles;
  }

  getArticlesHandler(res) {
    const articles = this.storage.getArticles();
    sendJson(res, articles);
  }

  getArticleHandler({articleId}, res) {
    const article = this.storage.getArticleById(articleId);
    if (!article) {
      return sendNotFound(res);
    }
    return sendJson(res, article);
  }

  getCommentsHandler({articleId}, res) {
    const article = this.storage.getArticleById(articleId);
    if (!article) {
      return sendNotFound(res);
    }
    return sendJson(res, article.comments);
  }

  postArticleHandler(body, res) {
    if (!isValidArticleBody(body)) {
      return sendBadRequest(res);
    }
    const newArticleId = this.storage.addNewArticle(body);
    return sendId(res, newArticleId);
  }

  postCommentHandler({articleId}, body, res) {
    if (!isValidCommentBody(body)) {
      return sendBadRequest(res);
    }
    const newCommentId = this.storage.addNewCommentByArticleId(articleId, body);
    if (!newCommentId) {
      return sendNotFound(res);
    }
    return sendId(res, newCommentId);
  }

  putArticleHandler({articleId}, body, res) {
    if (!isValidArticleBody(body)) {
      return sendBadRequest(res);
    }
    const newArticleId = this.storage.updateArticleById(articleId, body);
    if (!newArticleId) {
      return sendNotFound(res);
    }
    return sendId(res, newArticleId);
  }

  deleteArticleHandler({articleId}, res) {
    const removedArticleId = this.storage.removeArticleById(articleId);
    if (!removedArticleId) {
      return sendNotFound(res);
    }
    return sendNothing(res);
  }

  deleteCommentHandler({articleId, commentId}, res) {
    const removedCommentId = this.storage.removeCommentByArticleId(articleId, commentId);
    if (!removedCommentId) {
      return sendNotFound(res);
    }
    return sendNothing(res);
  }

}

module.exports = ArticleService;
