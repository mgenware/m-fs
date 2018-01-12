const main = require('../..');
import * as fs from 'fs';

it('Check a function', () => {
  expect(typeof main.listSubFiles).toEqual('function');
});

it('Check type definition file', () => {
  expect(fs.statSync('./dist/lib/main.d.ts').isFile()).toBeTruthy();
});
