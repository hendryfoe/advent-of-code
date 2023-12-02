// https://adventofcode.com/2023/day/2

const Utils = require('../utils/utils');

// 12 red cubes
// 13 green cubes
// 14 blue cubes

// A = split by ":"
// B = split A by ";"
// C = split B by ","

const gameSetting = {
  maxRedCube: 12,
  maxGreenCube: 13,
  maxBlueCube: 14
};

function isExceeded(value, maxValue) {
  return Number(value) > maxValue;
}

function checkCube() {}

function checkCubeIsExceeded(cubeData, color, maxCubeValue) {
  const [totalCube, cubeColor] = cubeData;
  if (cubeColor === color && isExceeded(totalCube, maxCubeValue)) {
    return true;
  }
  return false;
}

function getGamesNumber(data) {
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  // => 1: '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  // => 1: [3 blue, 4 red], [1 red, 2 green], [6 blue; 2 green]
  const validGamesNumber = new Set();
  data.forEach((d) => {
    const [game, subsetCubesRaw] = d.trim().split(':');
    // result => 1: '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
    const gameNumber = Number(game.trim().split(' ')[1]);

    // add game number temporarily
    validGamesNumber.add(gameNumber);

    // result => ['3 blue, 4 red'], ['1 red, 2 green'], ['6 blue; 2 green']
    const subsetCubes = subsetCubesRaw.trim().split(';');
    subsetCubes.forEach((subset) => {
      // result => [3 blue, 4 red], 1 red, 2 green, 6 blue, 2 green]
      subset
        .trim()
        .split(',')
        .forEach((cube) => {
          const cubeData = cube.trim().split(' ');
          if (checkCubeIsExceeded(cubeData, 'red', gameSetting.maxRedCube)) {
            validGamesNumber.delete(gameNumber);
            return;
          }
          if (
            checkCubeIsExceeded(cubeData, 'green', gameSetting.maxGreenCube)
          ) {
            validGamesNumber.delete(gameNumber);
            return;
          }
          if (checkCubeIsExceeded(cubeData, 'blue', gameSetting.maxBlueCube)) {
            validGamesNumber.delete(gameNumber);
            return;
          }
        });
    });
  });

  return validGamesNumber.values();
}

function sumGamesNumber(gamesNumber) {
  let total = 0;
  for (const gameNumber of gamesNumber) {
    total += gameNumber;
  }
  return total;
}

function getGameSummaries(data) {
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  // => 1: '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  // => 1: [3 blue, 4 red], [1 red, 2 green], [6 blue; 2 green]
  const gameSummaries = new Map();
  data.forEach((d) => {
    const [game, subsetCubesRaw] = d.trim().split(':');
    // result => 1: '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
    const gameNumber = Number(game.trim().split(' ')[1]);

    // result => ['3 blue, 4 red'], ['1 red, 2 green'], ['6 blue; 2 green']
    const subsetCubes = subsetCubesRaw.trim().split(';');
    // games "key" is "color"
    // games "value" is "total cube"
    const games = new Map();
    subsetCubes.forEach((subset) => {
      // result => [3 blue, 4 red], 1 red, 2 green, 6 blue, 2 green]
      subset
        .trim()
        .split(',')
        .forEach((cube) => {
          const [totalCubeRaw, cubeColor] = cube.trim().split(' ');
          let totalCube = Number(totalCubeRaw);
          if (games.has(cubeColor)) {
            totalCube = Math.max(totalCube, games.get(cubeColor));
          }
          games.set(cubeColor, totalCube);
        });
    });

    gameSummaries.set(gameNumber, games);
  });

  return gameSummaries;
}

function calculateAllGames(gameSummaries) {
  let total = 0;
  for (const game of gameSummaries.values()) {
    let totalPowerCube = 1;
    for (const totalCube of game.values()) {
      totalPowerCube *= totalCube;
    }
    total += totalPowerCube;
  }
  return total;
}

function solve(data) {
  return {
    partOne: sumGamesNumber(getGamesNumber(data)),
    partTwo: calculateAllGames(getGameSummaries(data))
  };
}

const data = Utils.getTestCases('./test-cases-2.txt');

console.log(JSON.stringify(solve(data), null, 2));
