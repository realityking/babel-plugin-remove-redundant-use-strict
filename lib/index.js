'use strict';

const {isModule, isClassMethodBody} = require('./types.js');
const {
  getUseStrictDirectives,
  hasUseStrictDirective,
  removeDuplicateUseStricts,
} = require('./strict-helpers.js');

function removeDirective(directive) {
  directive.remove();
}

function hasStrictParent(path) {
  return path.findParent(
    parent => {
      return (parent.isBlockStatement() && hasUseStrictDirective(parent))
        || parent.isClassDeclaration()
        || parent.isClassExpression();
    }
  );
}

function maybeRemoveUseStrict(block) {
  const useStricts = getUseStrictDirectives(block);

  // no use strict directives, return early
  if (useStricts.length === 0) {
    return;
  }

  if (isClassMethodBody(block) || hasStrictParent(block)) {
    useStricts.forEach(removeDirective);
  } else {
    removeDuplicateUseStricts(useStricts);
  }
}

const StrictProgramVisitor = {
  Function(path) {
    const body = path.get("body");
    if (body.isBlockStatement()) {
      getUseStrictDirectives(body).forEach(removeDirective)
    }
  },
};

const NonStrictProgramVisitor = {
  Function(path) {
    const body = path.get("body");
    if (body.isBlockStatement()) {
      maybeRemoveUseStrict(body);
    }
  },
};

function removeRedundantUseStrict() {
  return {
    name: 'remove-redundant-use-strict',
    visitor: {
      Program(path) {
        const useStricts = getUseStrictDirectives(path);

        const isModuleContext = isModule(path);
        const isStrictDeclared = useStricts.length !== 0;
        const isStrictProgram = isModuleContext || isStrictDeclared;

        if (isModuleContext && isStrictDeclared) {
          useStricts.forEach(removeDirective)
        } else {
          removeDuplicateUseStricts(useStricts);
        }

        path.traverse(isStrictProgram ? StrictProgramVisitor : NonStrictProgramVisitor);
      },
    },
  };
}

module.exports = removeRedundantUseStrict;