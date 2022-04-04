'use strict';

const root = process.cwd();
const {test, describe, expect} = require(`@jest/globals`);
const request = require(`supertest`);
const Storage = require(`${root}/src/api/storage/storage.js`);
const App = require(`${root}/src/express/express.js`);
const {HttpCode} = require(`${root}/src/api/constants.js`);

const categories = [`Деревья`, `За жизнь`, `Без рамки`, `Разное`, `IT решения`, `Музыка`, `Кино`, `Программирование`, `Железо`];

const storage = new Storage(undefined, categories);
const app = new App(storage);

describe(`Categories API end-points`, () => {

  describe(`Positive scenarios`, () => {

    test(`GET /api/categories`, async () => {
      const res = await request(app.instance).get(`/api/categories`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(categories.length);
      expect(res.body[0]).toBe(`Деревья`);
      expect(res.body[res.body.length - 1]).toBe(`Железо`);
    });

  });

  describe(`Negative scenarios`, () => {
    // TODO
  });

});
