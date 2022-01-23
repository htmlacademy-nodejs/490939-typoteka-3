'use strict';

const DEFAULT_PORT = 8080;

const express = require(`express`);
const mainRoutes = require(`./routes/main.js`);
const myRoutes = require(`./routes/my.js`);
const articlesRoutes = require(`./routes/articles.js`);

const app = express();
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(DEFAULT_PORT);
