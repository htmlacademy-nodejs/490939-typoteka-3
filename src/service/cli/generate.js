'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {ExitCode} = require(`../constants`);
const {getRandomElement, getRandomElements, getRandomPastDate, getUniqueArray, getRecordsFromTxtFile} = require(`../../utils`);

const FILE_NAME = `mocks.json`;
const MIN_RECORDS = 1;
const MAX_RECORDS = 1000;
const MAX_MONTHS_CREATED_AGO = 3;
const MAX_ANNOUNCE_SENTENCES = 5;
const DATE_LOCALE = `ru`;
const DataFilePath = {
  TITLES: `./data/titles.txt`,
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`
};

function getNewRecord(titles, sentences, categories) {
  return {
    title: getRandomElement(titles),
    createdDate: getRandomPastDate({maxMonthsAgo: MAX_MONTHS_CREATED_AGO}).toLocaleString(DATE_LOCALE),
    announce: getRandomElements(sentences, {maxElements: MAX_ANNOUNCE_SENTENCES}).join(` `),
    fullText: getRandomElements(sentences).join(` `),
    сategory: getUniqueArray(getRandomElements(categories))
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

    const records = Array.from({length: count}).map(() => getNewRecord(titles, sentences, categories));
    const data = JSON.stringify(records);

    try {
      await fs.writeFile(FILE_NAME, data);
    } catch (error) {
      console.error(chalk.red(`Ошибка записи данных в файл: ${error}`));
      process.exit(ExitCode.NOK);
    }

    console.info(chalk.green(`Файл ${FILE_NAME} успешно создан`));
  }
};
