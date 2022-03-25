'use strict';

const {sendJson} = require(`./api-responses.js`);
const storage = require(`../storage/storage.js`);

class CategoriesService {

  constructor() {
    this.storage = storage.categories;
  }

  getCategoriesHandler(res) {
    const categories = this.storage.getCategories();
    sendJson(res, categories);
  }

}

module.exports = CategoriesService;
