// https://adventofcode.com/2023/day/1

const Utils = require('../utils/utils');

const stringToNumber = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

const validNumbersDic = {
  o: ['one'],
  t: ['two', 'three'],
  f: ['four', 'five'],
  s: ['six', 'seven'],
  e: ['eight'],
  n: ['nine']
};

const validReverseNumbersDic = {
  e: ['one', 'three', 'five', 'nine'],
  o: ['two'],
  r: ['four'],
  x: ['six'],
  t: ['eight'],
  n: ['seven']
};

const testData = [
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineeightseven2',
  'zoneight234',
  '7pqrstsixteen'
];

function getFirstNumber(data) {
  for (let i = 0; i < data.length; i++) {
    if (validNumbersDic[data[i]]) {
      for (let numberText of validNumbersDic[data[i]]) {
        if (data.slice(i).indexOf(numberText) === 0) {
          return stringToNumber[numberText];
        }
      }
    }

    if (/\d/.test(data[i])) {
      return data[i];
    }
  }
}

function getLastNumber(data) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (validReverseNumbersDic[data[i]]) {
      for (let numberText of validReverseNumbersDic[data[i]]) {
        // it determine index based on number length
        // data = one1twothree
        // i = 11 = "e" (last index of text)
        // "e" is in ['one', 'three', 'five', 'nine'] buckets
        // so we iterate through the buckets
        // one1twothree
        //        ^   ^
        const startIndex = i + 1 - numberText.length;
        const endIndex = i + 1 + numberText.length;

        if (data.slice(startIndex, endIndex).indexOf(numberText) === 0) {
          return stringToNumber[numberText];
        }
      }
    }

    if (/\d/.test(data[i])) {
      return data[i];
    }
  }
}

function getFirstAndLastNumber(data) {
  const firstNumber = getFirstNumber(data);
  const lastNumber = getLastNumber(data);

  return Number(firstNumber + lastNumber);
}

function sum(data) {
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    total += getFirstAndLastNumber(data[i]);
  }

  return total;
}

function solve(data) {
  return sum(data);
}

const testCases = Utils.getTestCases('./test-cases.txt');

console.log(solve(testCases));
