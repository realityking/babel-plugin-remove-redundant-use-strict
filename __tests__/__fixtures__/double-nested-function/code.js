function useless() {
  'use strict';

  return function reallyUseless() {
    'use strict';

    return 1;
  };
}

module.exports = useless;