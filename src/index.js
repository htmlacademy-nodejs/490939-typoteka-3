'use strict';

const root = process.cwd();

require(`${root}/config.js`);

const ApiStorage = require(`${root}/src/api/api.storage.js`);
const Api = require(`${root}/src/api/api.js`);
const App = require(`${root}/src/express/express.js`);
const {getAppLogger} = require(`${root}/src/logger.js`);

const appLogger = getAppLogger();

const apiStorage = new ApiStorage();
const api = new Api(apiStorage);
const app = new App();

const {API_PORT, APP_PORT} = process.env;

apiStorage.load()
  .then(() => {
    api.instance
      .listen(API_PORT, () => appLogger.info(`API server listen ${API_PORT} port...`))
      .on(`error`, (err) => appLogger.error(`API server can't start. Error: ${err}`));
  })
  .then(() => {
    app.instance
      .listen(APP_PORT, () => appLogger.info(`Front server listen ${APP_PORT} port...`))
      .on(`error`, (err) => appLogger.error(`Front server can't start. Error: ${err}`));
  });
