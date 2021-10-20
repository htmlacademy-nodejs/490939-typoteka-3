'use strict';

const cli = require(`./cli`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode} = require(`./constants`);

const inputParams = process.argv.slice(USER_ARGV_INDEX);
const [inputCommand, ...restParams] = inputParams;

const hasNoInputParams = inputParams.length === 0;
const isNotSupportedCommand = Boolean(!cli[inputCommand]);

if (hasNoInputParams || isNotSupportedCommand) {
  cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.OK);
}

cli[inputCommand].run(restParams);
