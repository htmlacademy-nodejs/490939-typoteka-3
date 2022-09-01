'use strict';

const {date2HtmlFormat} = require(`./coverters/date.converter.js`);

class MyService {

  constructor(apiService) {
    this.apiService = apiService;
  }

  async getMyPageHandler(res) {
    const articles = await this.apiService.getArticles();
    res.render(`my`, {articles, date2HtmlFormat});
  }

  async getMyCommentsPageHandler(res) {
    const comments = await this.apiService.getMyComments();
    res.render(`comments`, {comments, date2HtmlFormat});
  }

  getCategoriesPageHandler(res) {
    res.render(`all-categories`);
  }

}

module.exports = MyService;
