'use strict';

const {sendJson} = require(`../api.responses.js`);

class CategoriesService {

  constructor(categoriesStorage) {
    this.categoriesStorage = categoriesStorage;
  }

  getCategoriesHandler(res) {
    const categories = this.categoriesStorage.getCategories();
    sendJson(res, categories);
  }

}

module.exports = CategoriesService;
