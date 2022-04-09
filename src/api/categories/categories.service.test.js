'use strict';

const root = process.cwd();
const {test, describe, expect, beforeEach} = require(`@jest/globals`);
const request = require(`supertest`);
const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const {HttpCode} = require(`${root}/src/api/constants.js`);
const testCategory = require(`./test-data/test.category.json`);

const apiStorage = new ApiStorage();
const api = new Api(apiStorage);
let categories;

beforeEach(async () => {
  await apiStorage.load();
  categories = apiStorage.categories._items;
  categories.push(testCategory);
});

describe(`CategorieshService`, () => {

  describe(`When get categories`, () => {

    test(`Should return all categories`, async () => {
      const res = await request(api.instance).get(`/api/categories`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(categories.length);
      expect(res.body[0]).toBe(categories[0]);
      expect(res.body[res.body.length - 1]).toBe(categories[categories.length - 1]);
      expect(res.body.includes(testCategory)).toBe(true);
    });

  });

});
