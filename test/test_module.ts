const main = require('../..');
import * as assert from 'assert';
import * as fs from 'fs';

describe('require this module', () => {
  it('Check a function', () => {
    // TODO: replace xxxFunc to one of your functions
    assert.equal(typeof main.listSubFiles, 'function');
  });

  it('Check type definition file', () => {
    assert.equal(fs.statSync('./dist/lib/main.d.ts').isFile(), true);
  });
});
