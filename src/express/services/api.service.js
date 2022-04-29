'use strict';

const axios = require(`axios`);

class ApiService {

  constructor() {
    this._baseUrl = `http://localhost:3004/api`;
    this._resStatus = undefined;
  }

  get resStatus() {
    return this._resStatus;
  }

  async getArticles(query) {
    try {
      let res;
      if (query) {
        res = await axios.get(`${this._baseUrl}/search?query=${encodeURI(query)}`);
      } else {
        res = await axios.get(`${this._baseUrl}/articles`);
      }
      this._resStatus = res.status;
      return res.data;
    } catch (err) {
      if (err.response) {
        this._resStatus = err.response.status;
      }
      return [];
    }
  }

  async postArticle(body) {
    try {
      const res = await axios.post(`${this._baseUrl}/articles`, body);
      this._resStatus = res.status;
    } catch (err) {
      if (err.response) {
        this._resStatus = err.response.status;
      }
    }
  }

  async getArticle(articleId) {
    try {
      const res = await axios.get(`${this._baseUrl}/articles/${articleId}`);
      this._resStatus = res.status;
      return res.data;
    } catch (err) {
      if (err.response) {
        this._resStatus = err.response.status;
      }
      return {};
    }
  }

  async getMyComments() {
    const articles = await this.getArticles();
    return articles.reduce((acc, article) => {
      acc = [...acc, ...article.comments];
      return acc;
    }, []);
  }

}

module.exports = ApiService;
