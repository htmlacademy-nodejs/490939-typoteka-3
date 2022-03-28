'use strict';

const ArticlesStorage = require(`./articles.storage.js`);
const CategoriesStorage = require(`./categories.storage.js`);

class Storage {

  constructor() {
    this.articles = new ArticlesStorage();
    this.categories = new CategoriesStorage();
    this.articles._load();
    this.categories._load();
  }

}

module.exports = new Storage();
