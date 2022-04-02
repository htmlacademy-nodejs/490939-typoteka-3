'use strict';

const root = process.cwd();
const {PORT} = require(`${root}/config.js`);
const Storage = require(`${root}/src/api/storage/storage.js`);
const App = require(`${root}/src/express/express.js`);

const storage = new Storage();
const app = new App(storage);

storage.load()
  .then(() => app.instance.listen(PORT, () => console.info(`Server listen ${PORT} port...`)));
