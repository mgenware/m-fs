import { promisify } from 'util';
import { stat } from 'fs';
const main = require('../');
const statAsync = promisify(stat);
import * as assert from 'assert';

it('Verify type definition files', async () => {
  assert.ok((await statAsync('./dist/main.d.ts')).isFile());
});

it('Verify a member', () => {
  assert.equal(typeof main.listSubFiles, 'function');
});
