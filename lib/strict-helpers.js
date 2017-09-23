'use strict';

const USE_STRICT = "use strict";

function isUseStrictDirective(directive) {
  return directive.node.value.value === USE_STRICT;
}

function getUseStrictDirectives(block) {
  return block.get("directives").filter(isUseStrictDirective);
}

function hasUseStrictDirective(block) {
  return getUseStrictDirectives(block).length > 0;
}

function removeDuplicateUseStricts(useStricts) {
  if (useStricts.length > 1) {
    for (let i = 1; i < useStricts.length; i++) {
      useStricts[i].remove();
    }
  }
}

module.exports = {
  getUseStrictDirectives,
  hasUseStrictDirective,
  removeDuplicateUseStricts,
};