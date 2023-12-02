const Fs = require('node:fs');
const Path = require('node:path');
const Process = require('node:process');

function getTestCases(filename) {
  const result = Fs.readFileSync(Path.join(Process.cwd(), filename), 'utf8');
  return result.split('\n');
}

module.exports = {
  getTestCases
};
