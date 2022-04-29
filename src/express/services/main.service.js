'use strict';

const {date2HtmlFormat} = require(`./coverters/date.converter.js`);

class MainService {

  constructor(apiService) {
    this.apiService = apiService;
  }

  async getHomePageHandler(res) {
    const articles = await this.apiService.getArticles();
    res.render(`main`, {articles, date2HtmlFormat});
  }

  getRegisterPageHandler(res) {
    res.render(`sign-up`);
  }

  getLoginPageHandler(res) {
    res.render(`login`);
  }

  getSearchPageHandler(res) {
    res.render(`search`, {articles: [], showResults: false});
  }

  async postSearchPageHandler({body: {query}}, res) {
    const articles = await this.apiService.getArticles(query);
    res.render(`search`, {articles, showResults: true, date2HtmlFormat});
  }

}

module.exports = MainService;
