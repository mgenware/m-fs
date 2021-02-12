/* eslint-disable prefer-template */
import * as assert from 'assert';
import * as nodepath from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as mfs from '../dist/main.js';

const DATA_DIR = './tests/data';

function resolve(...paths: string[]): string {
  return nodepath.resolve(DATA_DIR, ...paths);
}

it('readFileAsync', async () => {
  const buffer = await mfs.readFileAsync(resolve('a.txt'));
  assert.strictEqual(buffer.toString(), 'test\n');
});

it('readTextFileAsync', async () => {
  assert.strictEqual(await mfs.readTextFileAsync(resolve('a.txt')), 'test\n');
});

it('statOrNullAsync (An existent file)', async () => {
  const stat = (await mfs.statOrNullAsync(resolve('a.txt'))) as fs.Stats;
  assert.strictEqual(stat.isFile(), true);
});

it('statOrNullAsync (A non-existent)', async () => {
  const stat = (await mfs.statOrNullAsync(resolve('___FILE__NOT_EXISTS'))) as fs.Stats;
  assert.strictEqual(stat, null);
});

it('pathExists (An existent file)', async () => {
  const exists = await mfs.pathExists(resolve('a.txt'));
  assert.strictEqual(exists, true);
});

it('pathExists (An non-existent file)', async () => {
  const exists = await mfs.pathExists(resolve('___FILE__NOT_EXISTS'));
  assert.strictEqual(exists, false);
});

it('fileExists (An existent file)', async () => {
  const exists = await mfs.fileExists(resolve('a.txt'));
  assert.strictEqual(exists, true);
});

it('fileExists (An non-existent file)', async () => {
  const exists = await mfs.fileExists(resolve('___FILE__NOT_EXISTS'));
  assert.strictEqual(exists, false);
});

it('dirExists (An existent dir)', async () => {
  const exists = await mfs.dirExists(resolve('a'));
  assert.strictEqual(exists, true);
});

it('dirExists (An non-existent dir)', async () => {
  const exists = await mfs.dirExists(resolve('___FILE__NOT_EXISTS'));
  assert.strictEqual(exists, false);
});

it('listSubPaths (An existent dir)', async () => {
  const paths = await mfs.subPaths(resolve());
  assert.deepStrictEqual(paths.sort(), ['a', 'b', 'a.txt', 'b.json'].sort());
});

it('listSubPathsWithType (An existent dir)', async () => {
  const paths = await mfs.subPathsWithType(resolve());
  assert.deepEqual(
    paths.sort((a, b) => a.path.localeCompare(b.path)),
    [
      { path: 'a', isFile: false },
      { path: 'b', isFile: false },
      { path: 'a.txt', isFile: true },
      { path: 'b.json', isFile: true },
    ].sort((a, b) => a.path.localeCompare(b.path)),
  );
});

it('listSubDirs (An existent dir)', async () => {
  const paths = await mfs.subDirs(resolve());
  assert.deepStrictEqual(paths.sort(), ['a', 'b'].sort());
});

it('listSubFiles (An existent dir)', async () => {
  const paths = await mfs.subFiles(resolve());
  assert.deepStrictEqual(paths.sort(), ['a.txt', 'b.json'].sort());
});

it('writeFileAsync (writes to an non-existent dir)', async () => {
  // generate a random file name in tmp dir
  const tmp = nodepath.join(os.tmpdir(), `tmp-m-fs-${new Date().getTime()}`, 't.txt');
  await mfs.writeFileAsync(tmp, 'Abc');
  const content = await mfs.readTextFileAsync(tmp);
  assert.strictEqual(content, 'Abc');
});
