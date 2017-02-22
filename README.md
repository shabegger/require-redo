# require-redo
Fresh requires for unit testing

## Usage

```
const Redo = require('require-redo'),
      redo = new Redo(),
      myModule = redo.require('./myModule');
```

The `require` function removes a cached module and its dependencies. Each instance of the `Redo` class maintains a separate set of refreshed requires, so dependencies that have been removed from the cache are not removed a second time. This is so that with each `Redo` your modules will not have disagreement when `require`d multiple times.

This package has been developed primarily to provide fresh copies of stateful modules for each test during unit testing. I'm interested if anyone else has any other good uses.
