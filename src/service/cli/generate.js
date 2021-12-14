'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {ExitCode} = require(`../constants`);
const {getRandomElement, getRandomElements, getRandomPastDate, getUniqueArray} = require(`../../utils`);

const FILE_NAME = `mocks.json`;
const MIN_RECORDS = 1;
const MAX_RECORDS = 1000;
const MAX_MONTHS_CREATED_AGO = 3;
const MAX_ANNOUNCE_SENTENCES = 5;
const DATE_LOCALE = `ru`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

function getNewRecord() {
  return {
    title: getRandomElement(TITLES),
    createdDate: getRandomPastDate({maxMonthsAgo: MAX_MONTHS_CREATED_AGO}).toLocaleString(DATE_LOCALE),
    announce: getRandomElements(SENTENCES, {maxElements: MAX_ANNOUNCE_SENTENCES}).join(` `),
    fullText: getRandomElements(SENTENCES).join(` `),
    сategory: getUniqueArray(getRandomElements(CATEGORIES))
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

    const records = Array.from({length: count}).map(() => getNewRecord());
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
