'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};


const getRandomElement = (someArray) => {
  return someArray[getRandomInt(0, someArray.length - 1)];
};

const getRandomElements = (someArray, {maxElements} = {}) => {
  const count = getRandomInt(1, maxElements || someArray.length - 1);
  return shuffleArray(Array(count).fill(getRandomElement(someArray)));
};

const getRandomPastDate = ({maxMonthsAgo = 12}) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let maxPastDate = new Date(currentDate);
  maxPastDate.setMonth(currentMonth - maxMonthsAgo);

  return new Date(getRandomInt(maxPastDate.getTime(), currentDate.getTime()));
};

const getUniqueArray = (someArray) => {
  return [...new Set(someArray)];
};

module.exports = {
  getRandomInt,
  shuffleArray,
  getRandomElement,
  getRandomElements,
  getRandomPastDate,
  getUniqueArray
};

