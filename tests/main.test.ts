import * as mfs from '../';
import * as fs from 'fs';
import * as nodepath from 'path';
import * as os from 'os';
import * as assert from 'assert';

const TESTS_DIR = '../tests/';
const expect = assert.equal;

function resolve(path: string): string {
  return nodepath.join(__dirname, path);
}

it('readFileAsync', async () => {
  const buffer = await mfs.readFileAsync(resolve(TESTS_DIR + 'data/a.txt'));
  expect(buffer.toString(), 'test\n');
});

it('readTextFileAsync', async () => {
  expect(
    await mfs.readTextFileAsync(resolve(TESTS_DIR + 'data/a.txt')),
    'test\n',
  );
});

it('statOrNullAsync (An existent file)', async () => {
  const stat = (await mfs.statOrNullAsync(
    resolve(TESTS_DIR + 'data/a.txt'),
  )) as fs.Stats;
  expect(stat.isFile(), true);
});

it('statOrNullAsync (A non-existent)', async () => {
  const stat = (await mfs.statOrNullAsync(
    resolve('___FILE__NOT_EXISTS'),
  )) as fs.Stats;
  expect(stat, null);
});

it('pathExists (An existent file)', async () => {
  const exists = await mfs.pathExists(resolve(TESTS_DIR + 'data/a.txt'));
  expect(exists, true);
});

it('pathExists (An non-existent file)', async () => {
  const exists = await mfs.pathExists(resolve('___FILE__NOT_EXISTS'));
  expect(exists, false);
});

it('fileExists (An existent file)', async () => {
  const exists = await mfs.fileExists(resolve(TESTS_DIR + 'data/a.txt'));
  expect(exists, true);
});

it('fileExists (An non-existent file)', async () => {
  const exists = await mfs.fileExists(resolve('___FILE__NOT_EXISTS'));
  expect(exists, false);
});

it('dirExists (An existent dir)', async () => {
  const exists = await mfs.dirExists(resolve(TESTS_DIR + 'data/a'));
  expect(exists, true);
});

it('dirExists (An non-existent dir)', async () => {
  const exists = await mfs.dirExists(resolve('___FILE__NOT_EXISTS'));
  expect(exists, false);
});

it('listSubPaths (An existent dir)', async () => {
  const paths = await mfs.listSubPaths(resolve(TESTS_DIR + 'data'));
  assert.deepEqual(paths.sort(), ['a', 'b', 'a.txt', 'b.json'].sort());
});

it('listSubDirs (An existent dir)', async () => {
  const paths = await mfs.listSubDirs(resolve(TESTS_DIR + 'data'));
  assert.deepEqual(paths.sort(), ['a', 'b'].sort());
});

it('listSubFiles (An existent dir)', async () => {
  const paths = await mfs.listSubFiles(resolve(TESTS_DIR + 'data'));
  assert.deepEqual(paths.sort(), ['a.txt', 'b.json'].sort());
});

it('writeFileAsync (writes to an non-existent dir)', async () => {
  // generate a random file name in tmp dir
  const tmp = nodepath.join(
    os.tmpdir(),
    `tmp-m-fs-${new Date().getTime()}`,
    't.txt',
  );
  await mfs.writeFileAsync(tmp, 'Abc');
  const content = await mfs.readTextFileAsync(tmp);
  expect(content, 'Abc');
});
