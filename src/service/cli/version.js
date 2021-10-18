'use strict';

const packagesJson = require(`../../../package`);
const version = packagesJson.version;

module.exports = {
  name: `--version`,
  run() {
    console.info(version);
  }
};

