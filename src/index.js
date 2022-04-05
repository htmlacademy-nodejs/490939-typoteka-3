'use strict';

const root = process.cwd();
require(`${root}/config.js`);
const Storage = require(`${root}/src/api/storage/storage.js`);
const App = require(`${root}/src/express/express.js`);
const {getAppLogger} = require(`${root}/src/logger.js`);

const appLogger = getAppLogger();

const storage = new Storage();
const app = new App(storage);

storage.load()
  .then(() => {
    app.instance
      .listen(process.env.PORT, () => appLogger.info(`Server listen ${process.env.PORT} port...`))
      .on(`error`, (err) => appLogger.error(`Server can't start. Error: ${err}`));
  });
