'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);

const cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate
};

module.exports = cli;
