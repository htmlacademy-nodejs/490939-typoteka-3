'use strict';

const root = process.cwd();
const {test, describe, expect} = require(`@jest/globals`);
const request = require(`supertest`);
const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const {HttpCode} = require(`${root}/src/api/constants.js`);
const articlesMocks = require(`${root}/mocks/articles.json`);

const apiStorage = new ApiStorage(articlesMocks, undefined);
const api = new Api(apiStorage);

describe(`SearchService`, () => {

  describe(`When search articles by title`, () => {

    test(`Should return all matched articles`, async () => {
      const queryStr = `альбом`;

      const res = await request(api.instance).get(encodeURI(`/api/search?query=${queryStr}`));
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty(`id`, `wL1r-A`);
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
