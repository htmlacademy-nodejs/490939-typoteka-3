'use strict';

const {nanoid} = require(`nanoid`);

const ID_LENGTH = 6;

function getNewArticle(body, oldId) {
  return {
    id: oldId ? oldId : nanoid(ID_LENGTH),
    createdDate: body.createdDate,
    title: body.title,
    announce: body.announce,
    category: body.category,
    fullText: body.fullText ? `${body.announce} ${body.fullText}` : body.announce,
    photo: body.photo ? body.photo : ``,
    comments: []
  };
}

function getNewComment(body, oldId) {
  return {
    id: oldId ? oldId : nanoid(ID_LENGTH),
    createdDate: body.createdDate,
    name: body.name,
    text: body.text,
    articleTitle: body.articleTitle,
    avatar: body.avatar ? body.avatar : ``
  };
}

module.exports = {
  getNewArticle,
  getNewComment
};
