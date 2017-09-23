'use strict';

function useless() {
  return function reallyUseless() {

    return 1;
  };
}

module.exports = useless;