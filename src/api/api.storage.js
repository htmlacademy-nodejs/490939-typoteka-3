'use strict';

const ArticlesStorage = require(`./articles/articles.storage.js`);
const CategoriesStorage = require(`./categories/categories.storage.js`);

class ApiStorage {

  constructor() {
    this.articles = new ArticlesStorage();
    this.categories = new CategoriesStorage();
  }

  async load() {
    await this.articles._load();
    await this.categories._load();
  }

}

module.exports = ApiStorage;
