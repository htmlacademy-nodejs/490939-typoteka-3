'use strict';

const root = process.cwd();

require(`${root}/config.js`);

const ApiStorage = require(`${root}/src/api/api.storage.js`);
const App = require(`${root}/src/express/express.js`);
const {getAppLogger} = require(`${root}/src/logger.js`);

const appLogger = getAppLogger();

const apiStorage = new ApiStorage();
const app = new App(apiStorage);

apiStorage.load()
  .then(() => {
    app.instance
      .listen(process.env.PORT, () => appLogger.info(`Server listen ${process.env.PORT} port...`))
      .on(`error`, (err) => appLogger.error(`Server can't start. Error: ${err}`));
  });
