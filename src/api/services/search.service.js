'use strict';

const {sendNotFound, sendBadRequest, sendJson} = require(`./api-responses.js`);

class SearchService {

  constructor(articlesStorage) {
    this.articlesStorage = articlesStorage;
  }

  getSearchHandler({query}, res) {
    if (!query) {
      return sendBadRequest(res);
    }
    const articles = this.articlesStorage.getArticles();
    const result = articles.filter((article) => article.title.indexOf(query) !== -1);
    if (result.length) {
      return sendJson(res, result);
    }
    return sendNotFound(res);
  }

}

module.exports = SearchService;
