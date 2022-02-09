'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {getRecordsFromJsonFile} = require(`../../utils`);
const {FILE_NAME} = require(`../constants`);

const DEFAULT_PORT = 3000;
const HttpCodes = {
  OK: 200,
  NOT_FOUND: 404
};
const HttpMessages = {
  OK: `OK`,
  NOT_FOUND: `Not found`
};

const mainRouter = new express.Router();

mainRouter.get(`/posts`, (req, res) => {
  getRecordsFromJsonFile(`./${FILE_NAME}`)
  .then((records) => res.status(HttpCodes.OK).json(records))
  .catch((_err) => res.status(HttpCodes.OK).json([]));
});

mainRouter.get(`/*`, (req, res) => {
  res.status(HttpCodes.NOT_FOUND).send(HttpMessages.NOT_FOUND);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.isInteger(Number(customPort)) ? Number(customPort) : DEFAULT_PORT;

    const app = express();
    app.use(express.json());
    app.use(`/`, mainRouter);

    app.on(`error`, (err) => console.error(chalk.red(err)));

    app.listen(port, () => console.info(chalk.green(`Server listen ${port} port...`)));
  }
};
