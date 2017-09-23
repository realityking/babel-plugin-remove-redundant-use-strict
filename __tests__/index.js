const pluginTester = require('babel-plugin-tester');
const removeRedundantUseStrict = require('../lib/index.js');
const path = require('path');

pluginTester({
  plugin: removeRedundantUseStrict,
  fixtures: path.join(__dirname, '__fixtures__'),
  tests: {
    'no-change-to-bare-use-strict': {
      code: '\'use strict\';',
    },
    'remove-bare-double-use-strict': {
      code: '\'use strict\';\'use strict\';',
      output: '\'use strict\';',
    },
    'simple-module': {
      code: `
function useless() {
  'use strict';

  return 1;
}

export default useless;`,
      output: `
function useless() {

  return 1;
}

export default useless;`,
    },
    'module-with-use-strict': {
      code: `'use strict';
function useless() {

  return 1;
}

export default useless;`,
      output: `
function useless() {

  return 1;
}

export default useless;`,
    },
  },
});