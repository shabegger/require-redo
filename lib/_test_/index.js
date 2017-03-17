'use strict';

const Redo = require('..');

describe('The "Redo" class', () => {

  it('has a "require" function', () => {
    const redo = new Redo();
    expect(redo.require).toEqual(jasmine.any(Function));
  });

  it('clears required modules', () => {
    const redo1 = new Redo(),
          a1 = redo1.require('./fixtures/a');

    const redo2 = new Redo(),
          a2 = redo2.require('./fixtures/a');

    expect(a2).not.toBe(a1);
  });

  it('only clears once to maintain dependencies', () => {
    const redo1 = new Redo();
    redo1.require('./fixtures/a');

    const redo2 = new Redo(),
          b = redo2.require('./fixtures/b'),
          a = redo2.require('./fixtures/a');

    expect(a.b).toBe(b);
  });

});
