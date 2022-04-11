'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const ARTICLES_FILE_NAME = `articles.mocks.json`;

const CATEGORIES_FILE_NAME = `categories.mocks.json`;

const ExitCode = {
  OK: 0,
  NOK: 1
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ARTICLES_FILE_NAME,
  CATEGORIES_FILE_NAME,
  ExitCode
};
