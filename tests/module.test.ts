import { promisify } from 'util';
import { stat } from 'fs';
const main = require('../');
const statAsync = promisify(stat);

test('Verify type definition files', async () => {
  expect((await statAsync('./dist/main.d.ts')).isFile()).toBeTruthy();
});

it('Verify a member', () => {
  expect(typeof main.listSubFiles).toEqual('function');
});
