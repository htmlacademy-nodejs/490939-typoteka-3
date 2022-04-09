'use strict';

const root = process.cwd();
const {test, describe, expect} = require(`@jest/globals`);
const request = require(`supertest`);
const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const {HttpCode} = require(`${root}/src/api/constants.js`);

const articles = [
  {
    "id": `K7eVOM`,
    "title": `Что такое золотое сечение. Мнения.`,
    "createdDate": `24.01.2022, 16:47:27`,
    "announce": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    "fullText": `Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь.`,
    "category": [
      `Музыка`
    ],
    "comments": [
      {
        "id": `Zxzibk`,
        "text": `Мне кажется или я уже читал это где-то? Согласен с автором! Совсем немного... Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `ZOlMak`,
        "text": `Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `wL1r-A`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "createdDate": `31.01.2022, 11:17:24`,
    "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения.`,
    "fullText": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Процессор заслуживает особого внимания.`,
    "category": [
      `Разное`,
      `Без рамки`
    ],
    "comments": [
      {
        "id": `7015G9`,
        "text": `Мне не нравится ваш стиль.`
      }
    ]
  }
];
const apiStorage = new ApiStorage(articles, undefined);
const api = new Api(apiStorage);

describe(`Search API end-points`, () => {

  describe(`Positive scenarios`, () => {

    test(`GET /api/search`, async () => {
      const queryStr = `альбом`;

      const res = await request(api.instance).get(encodeURI(`/api/search?query=${queryStr}`));
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty(`id`, `wL1r-A`);
    });

  });

  describe(`Negative scenarios`, () => {

    test(`Query string is missed`, async () => {
      const res = await request(api.instance).get(encodeURI(`/api/search`));
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Query string is empty`, async () => {
      const queryStr = ``;

      const res = await request(api.instance).get(encodeURI(`/api/search?query=${queryStr}`));
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

  });

});
