'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const {getRecordsFromTxtFile, wrapInHtml} = require(`../../utils`);
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

const sendResponse = (res, statusCode, statusMsg, content) => {
  res.writeHead(statusCode, statusMsg, {'Content-Type': `text/html; charset=UTF-8`});
  res.end(wrapInHtml(content));
};

const onClientRequest = async (req, res) => {
  switch (req.url) {
    case `/`: {
      getRecordsFromTxtFile(`./${FILE_NAME}`)
      .then((titles) => {
        const items = titles.map((title) => `<li>${title}</li>`).join(``);
        const content = `<ul>${items}</ul>`;
        sendResponse(res, HttpCodes.OK, HttpMessages.OK, content);
      })
      .catch((error) => {
        const content = `<span>${HttpMessages.NOT_FOUND}: ${error}</span>`;
        sendResponse(res, HttpCodes.NOT_FOUND, HttpMessages.NOT_FOUND, content);
      });
      break;
    }
    default: {
      const content = `<span>${HttpMessages.NOT_FOUND}</span>`;
      sendResponse(res, HttpCodes.NOT_FOUND, HttpMessages.NOT_FOUND, content);
      break;
    }
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.isInteger(Number(customPort)) ? Number(customPort) : DEFAULT_PORT;

    http.createServer(onClientRequest)
      .listen(port)
      .on(`listening`, () => console.info(chalk.green(`Server listen port ${port}...`)))
      .on(`error`, (error) => console.error(chalk.red(error)));
  }
};
