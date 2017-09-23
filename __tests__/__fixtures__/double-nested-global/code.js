'use strict';

function useless() {
  return function reallyUseless() {
    'use strict';

    return 1;
  };
}

module.exports = useless;