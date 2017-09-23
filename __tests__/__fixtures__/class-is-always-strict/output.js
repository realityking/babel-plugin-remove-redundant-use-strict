class TestClass {
  constructor() {
    this.fn = () => {
      return 1;
    };
  }
  foo() {

    return 2;
  }
  bar() {
    return function () {

      return 3;
    };
  }
}

module.exports = TestClass;