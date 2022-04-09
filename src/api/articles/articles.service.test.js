/* eslint-disable max-nested-callbacks */
'use strict';

const root = process.cwd();
const {test, describe, expect, beforeEach} = require(`@jest/globals`);
const request = require(`supertest`);
const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const {HttpCode, ID_LENGTH} = require(`${root}/src/api/constants.js`);
const testArticle = require(`./test-data/test.article.json`);

const apiStorage = new ApiStorage();
const api = new Api(apiStorage);
let articles;

beforeEach(async () => {
  await apiStorage.load();
  articles = apiStorage.articles._items;
  articles.push(testArticle);
});

describe(`ArticleService`, () => {

  describe(`When get articles`, () => {

    test(`Should return all articles`, async () => {
      const res = await request(api.instance).get(`/api/articles`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.headers[`content-type`]).toBe(`application/json; charset=utf-8`);
      expect(res.body.length).toBe(articles.length);
      expect(res.body[0]).toHaveProperty(`id`);
      expect(res.body[0]).toHaveProperty(`title`);
    });

    test(`Should return single article`, async () => {
      const articleId = testArticle.id;
      const article = articles.find((item) => item.id === articleId);

      const res = await request(api.instance).get(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body).toHaveProperty(`id`, article.id);
      expect(res.body).toHaveProperty(`title`, article.title);
      expect(res.body).toHaveProperty(`createdDate`, article.createdDate);
      expect(res.body).toHaveProperty(`announce`, article.announce);
      expect(res.body).toHaveProperty(`fullText`, article.fullText);
      expect(res.body).toHaveProperty(`category`);
      expect(res.body.category[0]).toBe(article.category[0]);
      expect(res.body.category[1]).toBe(article.category[1]);
      expect(res.body).toHaveProperty(`comments`);
      expect(res.body.comments.length).toBe(1);
      expect(res.body.comments[0]).toHaveProperty(`id`, article.comments[0].id);
      expect(res.body.comments[0]).toHaveProperty(`text`, article.comments[0].text);
    });

    test(`Should return article's comments`, async () => {
      const articleId = testArticle.id;
      const article = articles.find((item) => item.id === articleId);

      const res = await request(api.instance).get(`/api/articles/${articleId}/comments`);
      expect(res.statusCode).toBe(HttpCode.OK);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty(`id`, article.comments[0].id);
      expect(res.body[0]).toHaveProperty(`text`, article.comments[0].text);
    });

  });

  describe(`When post articles`, () => {

    test(`Should create new article`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        title: `Обзор TOP 5 популярных BI решений`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };

      const res = await request(api.instance).post(`/api/articles`).send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.CREATED);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body.id.length).toBe(ID_LENGTH);

      const newArticleId = res.body.id;

      expect(newArticleId).toBe(articles[articles.length - 1].id);
    });

    test(`Should create new article's comment`, async () => {
      const articleId = testArticle.id;
      const article = articles.find((item) => item.id === articleId);
      const articleCommentsCount = article.comments.length;
      const newCommentBody = {
        createdDate: `21.01.2022, 12:21`,
        name: `Иванов Петр`,
        text: `Тема не раскрыта...`,
        articleTitle: `Что такое золотое сечение. Мнения.`
      };

      const res = await request(api.instance).post(`/api/articles/${articleId}/comments`).send(newCommentBody);
      expect(res.statusCode).toBe(HttpCode.CREATED);
      expect(res.body).toHaveProperty(`id`);
      expect(res.body.id.length).toBe(ID_LENGTH);

      const newCommentId = res.body.id;
      const lastComment = article.comments[article.comments.length - 1];

      expect(article.comments.length).toBe(articleCommentsCount + 1);
      expect(lastComment).toHaveProperty(`id`, newCommentId);
      expect(lastComment).toHaveProperty(`text`, newCommentBody.text);
    });

    test(`Shouldn't create new article if 'title' field doesn't passed`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };

      const res = await request(api.instance).post(`/api/articles`).send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Shouldn't create new article if 'title' field is too short`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        title: `Обзор`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };

      const res = await request(api.instance).post(`/api/articles`).send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Shouldn't create new article if 'createdDate' field has wrong format`, async () => {
      const newArticleBody = {
        createdDate: `19-12-2021, 11:11`,
        title: `Обзор TOP 5 популярных BI решений`,
        category: [`IT решения`],
        announce: `Сравниваем 5 популярных BI решений`
      };

      const res = await request(api.instance).post(`/api/articles`).send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`Shouldn't create new article if 'category' field isn't array`, async () => {
      const newArticleBody = {
        createdDate: `19.12.2021, 11:11`,
        title: `Обзор TOP 5 популярных BI решений`,
        category: `IT решения`,
        announce: `Сравниваем 5 популярных BI решений`
      };

      const res = await request(api.instance).post(`/api/articles`).send(newArticleBody);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

  });

  describe(`When edit articles`, () => {

    test(`Should change exist article's title`, async () => {
      const articleId = testArticle.id;
      const article = articles.find((item) => item.id === articleId);
      const updatedBody = Object.assign(article, {title: `Самый худший музыкальный альбом этого года`});

      const res = await request(api.instance).put(`/api/articles/${articleId}`).send(updatedBody);
      expect(res.statusCode).toBe(HttpCode.CREATED);
      expect(article.title).toBe(updatedBody.title);
    });

  });

  describe(`When delete articles`, () => {

    test(`Should delete single article`, async () => {
      const articleId = testArticle.id;

      const res = await request(api.instance).delete(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.NO_CONTENT);

      const article = articles.find((item) => item.id === articleId);
      expect(article).toBe(undefined);
    });

    test(`Should delete single article's comment`, async () => {
      const articleId = testArticle.id;
      const commentId = testArticle.comments[0].id;

      const res = await request(api.instance).delete(`/api/articles/${articleId}/comments/${commentId}`);
      expect(res.statusCode).toBe(HttpCode.NO_CONTENT);

      const article = articles.find((item) => item.id === articleId);
      const comment = article.comments.find((item) => item.id === commentId);
      expect(comment).toBe(undefined);
    });

  });

});
