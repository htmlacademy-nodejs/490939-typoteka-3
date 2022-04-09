'use strict';

const root = process.cwd();
const {test, describe, expect} = require(`@jest/globals`);
const request = require(`supertest`);
const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const {HttpCode, ID_LENGTH} = require(`${root}/src/api/constants.js`);

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

describe(`Articles API end-points`, () => {

  describe(`Positive scenarios`, () => {

    test(`GET /api/articles`, async () => {
      const res = await request(api.instance).get(`/api/articles`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(articles.length);
      expect(res.body[0]).toHaveProperty(`title`, `Что такое золотое сечение. Мнения.`);
      expect(res.body[1]).toHaveProperty(`id`, `wL1r-A`);
    });

    test(`GET /api/articles/:articleId`, async () => {
      const articleId = `wL1r-A`;

      const res = await request(api.instance).get(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body).toHaveProperty(`id`, articleId);
      expect(res.body).toHaveProperty(`title`, `Самый лучший музыкальный альбом этого года`);
      expect(res.body).toHaveProperty(`createdDate`, `31.01.2022, 11:17:24`);
      expect(res.body).toHaveProperty(`announce`);
      expect(res.body).toHaveProperty(`fullText`);
      expect(res.body).toHaveProperty(`category`);
      expect(res.body.category[0]).toBe(`Разное`);
      expect(res.body.category[1]).toBe(`Без рамки`);
      expect(res.body).toHaveProperty(`comments`);
      expect(res.body.comments.length).toBe(1);
      expect(res.body.comments[0]).toHaveProperty(`id`, `7015G9`);
      expect(res.body.comments[0]).toHaveProperty(`text`);
    });

    test(`GET /api/articles/:articleId/comments`, async () => {
      const articleId = `wL1r-A`;

      const res = await request(api.instance).get(`/api/articles/${articleId}/comments`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty(`id`, `7015G9`);
      expect(res.body[0]).toHaveProperty(`text`, `Мне не нравится ваш стиль.`);
    });

    test(`POST /api/articles`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        title: `Обзор TOP 5 популярных BI решений`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };
      let res;

      res = await request(api.instance)
        .post(`/api/articles`)
        .send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.CREATED);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body.id.length).toBe(ID_LENGTH);

      const newArticleId = res.body.id;

      res = await request(api.instance).get(`/api/articles/${newArticleId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body).toHaveProperty(`title`, newArticleBody.title);

      res = await request(api.instance).get(`/api/articles`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body.length).toBe(articles.length);
    });

    test(`POST /api/articles/:articleId/comments`, async () => {
      const articleId = `K7eVOM`;
      const newCommentBody = {
        createdDate: `21.01.2022, 12:21`,
        name: `Иванов Петр`,
        text: `Тема не раскрыта...`,
        articleTitle: `Что такое золотое сечение. Мнения.`
      };
      let res;

      res = await request(api.instance)
        .post(`/api/articles/${articleId}/comments`)
        .send(newCommentBody);
      expect(res.statusCode).toBe(HttpCode.CREATED);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body.id.length).toBe(ID_LENGTH);

      const newCommentId = res.body.id;

      res = await request(api.instance).get(`/api/articles/${articleId}/comments`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body.length).toBe(articles[0].comments.length);

      expect(res.body[res.body.length - 1]).toHaveProperty(`id`, newCommentId);
      expect(res.body[res.body.length - 1]).toHaveProperty(`text`, newCommentBody.text);
    });

    test(`PUT /api/articles/:articleId`, async () => {
      const articleId = `wL1r-A`;
      const newArticleTitle = `Самый худший музыкальный альбом этого года`;
      let res;

      res = await request(api.instance).get(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body).toHaveProperty(`id`, articleId);

      const updatedArticleBody = Object.assign(res.body, {title: newArticleTitle});

      res = await request(api.instance)
        .put(`/api/articles/${articleId}`)
        .send(updatedArticleBody);
      expect(res.statusCode).toBe(HttpCode.CREATED);
      expect(res.body).toHaveProperty(`id`, articleId);

      res = await request(api.instance).get(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body).toHaveProperty(`title`, newArticleTitle);
    });

    test(`DELETE /api/articles/:articleId`, async () => {
      const articleId = `K7eVOM`;
      let res;

      res = await request(api.instance).delete(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.NO_CONTENT);

      res = await request(api.instance).get(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);

      res = await request(api.instance).get(`/api/articles`);
      expect(res.body.length).toBe(2);
    });

    test(`DELETE /api/articles/:articleId/comments/:commentId`, async () => {
      const articleId = `wL1r-A`;
      const commentId = `7015G9`;
      let res;

      res = await request(api.instance).delete(`/api/articles/${articleId}/comments/${commentId}`);
      expect(res.statusCode).toBe(HttpCode.NO_CONTENT);

      res = await request(api.instance).get(`/api/articles/${articleId}/comments`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body.length).toBe(0);
    });

  });

  describe(`Negative scenarios`, () => {

    test(`Field title property doesn't exist`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };
      let res;

      res = await request(api.instance)
        .post(`/api/articles`)
        .send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Field createdDate has wrong format`, async () => {
      const newArticleBody = {
        createdDate: `19-12-2021, 11:11`,
        title: `Обзор TOP 5 популярных BI решений`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };
      let res;

      res = await request(api.instance)
        .post(`/api/articles`)
        .send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Field title too short`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        title: `Обзор`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };
      let res;

      res = await request(api.instance)
        .post(`/api/articles`)
        .send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Field category isn't array`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        title: `Обзор TOP 5 популярных BI решений`,
        category: `IT решения`,
        announce: `Сравниваем 5 популярных BI решений`
      };
      let res;

      res = await request(api.instance)
        .post(`/api/articles`)
        .send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

  });

});
