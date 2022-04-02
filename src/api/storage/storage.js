'use strict';

const root = process.cwd();
const {NODE_ENV} = require(`${root}/config.js`);
const ArticlesStorage = require(`./articles.storage.js`);
const CategoriesStorage = require(`./categories.storage.js`);

class Storage {

  constructor(articles, categories) {
    this.articles = new ArticlesStorage(articles);
    this.categories = new CategoriesStorage(categories);
  }

  async load() {
    if (NODE_ENV === `production`) {
      await this.articles._load();
      await this.categories._load();
    }
  }

}

module.exports = Storage;
