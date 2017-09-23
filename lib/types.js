'use strict';

const types = require('babel-types');

function isModuleNode(node) {
  return types.isModuleDeclaration(node);
}

function isClassMethodBody(block) {
  return types.isClassMethod(block.container);
}

function isModule(block) {
  return block.node.body.some(isModuleNode);
}

module.exports = {isModule, isClassMethodBody};