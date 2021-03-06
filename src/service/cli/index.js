'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);
const server = require(`./server`);

const cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate,
  [server.name]: server
};

module.exports = cli;
