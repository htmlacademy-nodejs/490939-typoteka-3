'use strict';

const root = process.cwd();
const {test, describe, expect} = require(`@jest/globals`);
const request = require(`supertest`);
const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const {HttpCode} = require(`${root}/src/api/constants.js`);
const categoriesMocks = require(`${root}/mocks/categories.json`);

const apiStorage = new ApiStorage(undefined, categoriesMocks);
const api = new Api(apiStorage);

describe(`Categories API end-points`, () => {

  describe(`Positive scenarios`, () => {

    test(`GET /api/categories`, async () => {
      const res = await request(api.instance).get(`/api/categories`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(categoriesMocks.length);
      expect(res.body[0]).toBe(`Деревья`);
      expect(res.body[res.body.length - 1]).toBe(`Железо`);
    });

  });

  describe(`Negative scenarios`, () => {
    // TODO
  });

});
