'use strict';

const fs = require(`fs`).promises;

// возвращает случайное целое число
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивает переданный массив
const shuffleArray = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

// возвращает случайный элемент из переданного массива
const getRandomElement = (someArray) => {
  return someArray[getRandomInt(0, someArray.length - 1)];
};

// возвращает случайный набор элементов из переданного массива
const getRandomElements = (someArray, {maxElements} = {}) => {
  const count = getRandomInt(1, maxElements || someArray.length - 1);
  return shuffleArray(Array.from({length: count}).map(() => getRandomElement(someArray)));
};

// возвращает случайную дату из прошлого
const getRandomPastDate = ({maxMonthsAgo = 12}) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let maxPastDate = new Date(currentDate);
  maxPastDate.setMonth(currentMonth - maxMonthsAgo);

  return new Date(getRandomInt(maxPastDate.getTime(), currentDate.getTime()));
};

// возвращает только уникальные эл-ты массива
const getUniqueArray = (someArray) => {
  return [...new Set(someArray)];
};

// возвращает массив строк из текстового файла
const getRecordsFromTxtFile = async (filePath) => {
  try {
    const rows = await fs.readFile(filePath);
    return String(rows).trim().split(`\n`);
  } catch (err) {
    return ``;
  }
};

// возвращает js object из json файла
const getRecordsFromJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// возвращает из массива эл-т с указанным id
function getItem(items, itemId) {
  return items.find((el) => el.id === itemId);
}

// возвращает из массива индекс эл-та с указанным id
function getItemIndex(items, itemId) {
  return items.findIndex((el) => el.id === itemId);
}

// проверяет наличие в массиве эл-та с указанным id
function hasItem(items, itemId) {
  return Boolean(getItemIndex(items, itemId) !== -1);
}

// удаляет из массива эл-т с указанным id
function removeItem(items, itemId) {
  const index = getItemIndex(items, itemId);
  if (index !== -1) {
    items.splice(index, 1);
  }
  return items;
}

module.exports = {
  getRandomInt,
  shuffleArray,
  getRandomElement,
  getRandomElements,
  getRandomPastDate,
  getUniqueArray,
  getRecordsFromTxtFile,
  getRecordsFromJsonFile,
  getItem,
  hasItem,
  removeItem
};

