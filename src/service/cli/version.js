'use strict';

const chalk = require(`chalk`);
const packagesJson = require(`../../../package`);
const version = packagesJson.version;

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(version));
  }
};

