'use strict';

const root = process.cwd();
const {getRecordsFromTxtFile} = require(`${root}/src/utils.js`);

class CategoriesStorage {

  constructor(items) {
    this._items = items || [];
  }

  async _load() {
    this._items = await getRecordsFromTxtFile(`./data/categories.txt`);
  }

  getCategories() {
    return this._items;
  }

}

module.exports = CategoriesStorage;
