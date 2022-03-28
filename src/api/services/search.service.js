'use strict';

const {sendNotFound, sendBadRequest, sendJson} = require(`./api-responses.js`);
const storage = require(`../storage/storage.js`);

class SearchService {

  constructor() {
    this.storage = storage.articles;
  }

  getSearchHandler({query}, res) {
    if (!query) {
      return sendBadRequest(res);
    }
    const articles = this.storage.getArticles();
    const result = articles.filter((article) => article.title.indexOf(query) !== -1);
    if (result.length) {
      return sendJson(res, result);
    }
    return sendNotFound(res);
  }

}

module.exports = SearchService;
