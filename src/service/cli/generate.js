'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {ARTICLES_FILE_NAME, CATEGORIES_FILE_NAME, ExitCode} = require(`../constants`);
const {getRandomInt, getRandomElement, getRandomElements, getRandomPastDate, getUniqueArray, getRecordsFromTxtFile} = require(`../../utils`);

const ID_LENGTH = 6;
const MIN_RECORDS = 1;
const MAX_RECORDS = 1000;
const MAX_COMMENTS = 10;
const MAX_MONTHS_CREATED_AGO = 3;
const MAX_ANNOUNCE_SENTENCES = 5;
const DATE_LOCALE = `ru`;
const DataFilePath = {
  TITLES: `./data/titles.txt`,
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`
};

function getComments(comments) {
  return Array.from({length: getRandomInt(0, MAX_COMMENTS)})
    .map(() => {
      return {
        id: nanoid(ID_LENGTH),
        text: getUniqueArray(getRandomElements(comments)).join(` `)
      };
    });
}

function getNewRecord(titles, sentences, categories, comments) {
  return {
    id: nanoid(ID_LENGTH),
    title: getRandomElement(titles),
    createdDate: getRandomPastDate({maxMonthsAgo: MAX_MONTHS_CREATED_AGO}).toLocaleString(DATE_LOCALE),
    announce: getRandomElements(sentences, {maxElements: MAX_ANNOUNCE_SENTENCES}).join(` `),
    fullText: getRandomElements(sentences).join(` `),
    category: getUniqueArray(getRandomElements(categories)),
    comments: getComments(comments)
  };
}

module.exports = {
  name: `--generate`,
  async run(args) {
    let [count] = args;
    count = Number.parseInt(count, 10);
    count = isNaN(count) ? MIN_RECORDS : count;

    if (count > MAX_RECORDS) {
      console.error(chalk.red(`Не больше ${MAX_RECORDS} публикаций`));
      process.exit(ExitCode.NOK);
    }

    const titles = await getRecordsFromTxtFile(DataFilePath.TITLES);
    const sentences = await getRecordsFromTxtFile(DataFilePath.SENTENCES);
    const categories = await getRecordsFromTxtFile(DataFilePath.CATEGORIES);
    const comments = await getRecordsFromTxtFile(DataFilePath.COMMENTS);

    const records = Array.from({length: count}).map(() => getNewRecord(titles, sentences, categories, comments));
    const articles = JSON.stringify(records);

    try {
      await fs.writeFile(`./mocks/${ARTICLES_FILE_NAME}`, articles);
      await fs.writeFile(`./mocks/${CATEGORIES_FILE_NAME}`, categories);
    } catch (error) {
      console.error(chalk.red(`Ошибка записи данных в файл: ${error}`));
      process.exit(ExitCode.NOK);
    }

    console.info(chalk.green(`Mock файлы успешно созданы`));
  }
};
