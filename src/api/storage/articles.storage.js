'use strict';

const root = process.cwd();
const {nanoid} = require(`nanoid`);
const {getRecordsFromJsonFile} = require(`${root}/src/utils.js`);
const {ID_LENGTH} = require(`../constants.js`);

class ArticlesStorage {

  constructor(items) {
    this._items = items || [];
  }

  async _load() {
    this._items = await getRecordsFromJsonFile(`./mocks.json`);
  }

  _getArticle(body, articleId) {
    return {
      id: articleId ? articleId : nanoid(ID_LENGTH),
      createdDate: body.createdDate,
      title: body.title,
      announce: body.announce,
      category: body.category,
      fullText: body.fullText ? `${body.announce} ${body.fullText}` : body.announce,
      photo: body.photo ? body.photo : ``,
      comments: body.comments ? body.comments : []
    };
  }

  _getComment(body, commentId) {
    return {
      id: commentId ? commentId : nanoid(ID_LENGTH),
      createdDate: body.createdDate,
      name: body.name,
      text: body.text,
      articleTitle: body.articleTitle,
      avatar: body.avatar ? body.avatar : ``
    };
  }

  getArticles() {
    return this._items;
  }

  getArticleById(articleId) {
    return this._items.find((article) => article.id === articleId);
  }

  addNewArticle(body) {
    const article = this._getArticle(body);
    this._items.push(article);
    return article.id;
  }

  addNewCommentByArticleId(articleId, body) {
    const article = this.getArticleById(articleId);
    if (!article) {
      return undefined;
    }
    const comment = this._getComment(body);
    article.comments.push(comment);
    return comment.id;
  }

  updateArticleById(articleId, body) {
    const article = this.getArticleById(articleId);
    if (!article) {
      return undefined;
    }
    this.removeArticleById(articleId);
    const newArticle = this._getArticle(body, articleId);
    this._items = [...this._items, newArticle];
    return articleId;
  }

  removeArticleById(articleId) {
    const articleIndex = this._items.findIndex((item) => item.id === articleId);
    if (articleIndex === -1) {
      return undefined;
    }
    this._items.splice(articleIndex, 1);
    return articleId;
  }

  removeCommentByArticleId(articleId, commentId) {
    const article = this.getArticleById(articleId);
    if (!article) {
      return undefined;
    }
    const commentIndex = article.comments.findIndex((item) => item.id === commentId);
    if (commentIndex === -1) {
      return undefined;
    }
    article.comments.splice(commentIndex, 1);
    return commentId;
  }

}

module.exports = ArticlesStorage;
