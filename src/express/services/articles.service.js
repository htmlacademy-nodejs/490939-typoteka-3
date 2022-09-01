'use strict';

const root = process.cwd();
const {date2HtmlFormat, date2ApiFormat} = require(`./coverters/date.converter.js`);
const {HttpCode} = require(`${root}/src/api/constants.js`);

class ArticlesService {

  constructor(apiService) {
    this.apiService = apiService;
  }

  getAddArticlePageHandler(res) {
    res.render(`post`);
  }

  async postArticleHandler({body}, res) {
    body.createdDate = date2ApiFormat(body.createdDate);
    // TODO: need to get categories array from the 'post' page's form
    // TEMP: mock category
    body.category = [`Разное`];
    await this.apiService.postArticle(body);
    const resStatus = this.apiService.resStatus;
    if (resStatus === HttpCode.CREATED) {
      res.redirect(`/my`);
    } else {
      res.render(`post`, {article: body, date2HtmlFormat});
    }
  }

  async getArticlePageHandler({articleId}, res) {
    const article = await this.apiService.getArticle(articleId);
    const resStatus = this.apiService.resStatus;
    const pageName = resStatus === HttpCode.NOT_FOUND ? `404` : `post-detail`;
    res.render(pageName, {article, date2HtmlFormat});
  }

  async getEditArticlePageHandler({articleId}, res) {
    const article = await this.apiService.getArticle(articleId);
    const resStatus = this.apiService.resStatus;
    const pageName = resStatus === HttpCode.NOT_FOUND ? `404` : `post`;
    res.render(pageName, {article, date2HtmlFormat});
  }

  getCategoryPageHandler(res) {
    res.render(`articles-by-category`);
  }

}

module.exports = ArticlesService;
