'use strict';

const root = process.cwd();
const pino = require(`pino`);

const appLogger = pino({
  name: `app-logger`,
  level: process.env.LOG_LEVEL || `info`
},
pino.destination(process.env.NODE_ENV === `production` ? `${root}/logs/app.log` : 1)
);

const apiLogger = pino({
  name: `api-logger`,
  level: process.env.LOG_LEVEL || `info`
},
pino.destination(process.env.NODE_ENV === `production` ? `${root}/logs/api.log` : 1)
);

const getAppLogger = (options = {}) => appLogger.child(options);

const getApiLogger = (options = {}) => apiLogger.child(options);

module.exports = {
  getAppLogger,
  getApiLogger
};

