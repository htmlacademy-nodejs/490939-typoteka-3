/* eslint-disable max-nested-callbacks */
'use strict';

const root = process.cwd();
const {test, describe, expect, beforeEach} = require(`@jest/globals`);
const request = require(`supertest`);
const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const {HttpCode} = require(`${root}/src/api/constants.js`);
const testArticle = require(`./test-data/test.article.json`);

const apiStorage = new ApiStorage();
const api = new Api(apiStorage);
let articles;

beforeEach(async () => {
  await apiStorage.load();
  articles = apiStorage.articles._items;
  articles.push(testArticle);
});

describe(`SearchService`, () => {

  describe(`When search articles by title`, () => {

    test(`Should return all matched articles`, async () => {
      const queryStr = `альбом`;
      const matches = articles.filter((item) => item.title.indexOf(queryStr) !== -1);

      const res = await request(api.instance).get(encodeURI(`/api/search?query=${queryStr}`));
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(matches.length);
      expect(res.body[0]).toHaveProperty(`id`, matches[0].id);
    });

    test(`Should return 400 if query string is missed`, async () => {
      const res = await request(api.instance).get(encodeURI(`/api/search`));
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Should return 400 if auery string is empty`, async () => {
      const queryStr = ``;

      const res = await request(api.instance).get(encodeURI(`/api/search?query=${queryStr}`));
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

  });

});
