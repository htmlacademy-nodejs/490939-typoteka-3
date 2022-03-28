'use strict';

const {getRecordsFromTxtFile} = require(`../../utils.js`);

class CategoriesStorage {

  constructor() {
    this._items = [];
  }

  async _load() {
    this._items = await getRecordsFromTxtFile(`./data/categories.txt`);
  }

  getCategories() {
    return this._items;
  }

}

module.exports = CategoriesStorage;
