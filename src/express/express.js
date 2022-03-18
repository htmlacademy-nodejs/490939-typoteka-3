'use strict';

const DEFAULT_PORT = 8080;

const path = require(`path`);
const express = require(`express`);
const mainRoutes = require(`./routes/main.js`);
const myRoutes = require(`./routes/my.js`);
const articlesRoutes = require(`./routes/articles.js`);
const apiRoutes = require(`./routes/api/index.js`);

const app = express();

app.use(express.static(path.resolve(__dirname, `./public`)));

app.set(`views`, path.resolve(__dirname, `./templates/pages`));
app.set(`view engine`, `pug`);

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/api`, apiRoutes);

app.on(`error`, (err) => console.error(err));

app.listen(DEFAULT_PORT, () => console.info(`Server listen ${DEFAULT_PORT} port...`));
