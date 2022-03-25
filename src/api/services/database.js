'use strict';

const {getRecordsFromJsonFile, getRecordsFromTxtFile} = require(`../../utils.js`);

const loadArticles = async () => await getRecordsFromJsonFile(`./mocks.json`);
const loadCategories = async () => await getRecordsFromTxtFile(`./data/categories.txt`);

async function getData() {
  const articles = await loadArticles();
  const categories = await loadCategories();
  return {articles, categories};
}

module.exports = getData;
