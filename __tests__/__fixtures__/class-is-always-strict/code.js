class TestClass {
  constructor() {
    this.fn = () => {
      'use strict';
      return 1;
    };
  }
  foo() {
    'use strict';

    return 2;
  }
  bar() {
    return function () {
      'use strict';

      return 3;
    };
  }
}

module.exports = TestClass;