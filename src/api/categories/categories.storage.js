'use strict';

const root = process.cwd();
const {getRecordsFromJsonFile} = require(`${root}/src/utils.js`);

class CategoriesStorage {

  constructor() {
    this._items = [];
  }

  async _load() {
    this._items = await getRecordsFromJsonFile(`./data/categories.mocks.json`);
  }

  getCategories() {
    return this._items;
  }

}

module.exports = CategoriesStorage;
