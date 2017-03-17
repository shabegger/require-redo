'use strict';

const callsite = require('callsite'),
      path = require('path');

const redoneMap = new WeakMap();

function clear(redo, modulePath) {
  const redoneSet = redoneMap.get(redo),
        resolvedPath = require.resolve(modulePath),
        cached = require.cache[resolvedPath];

  if (redoneSet.has(resolvedPath)) return;

  delete require.cache[resolvedPath];
  cached && cached.children && cached.children.forEach(child => {
    clear(redo, child.id);
  });

  redoneSet.add(resolvedPath);
}

class Redo {
  constructor() {
    redoneMap.set(this, new Set());
  }

  require(modulePath) {
    const stack = callsite(),
          caller = stack[1].getFileName(),
          fullPath = path.join(path.dirname(caller), modulePath);

    clear(this, fullPath);
    return require(fullPath);
  }
}

module.exports = Redo;
