import * as mfs from '../lib/main';
import * as fs from 'fs';
import * as nodepath from 'path';
import * as os from 'os';

function resolve(path: string): string {
  return nodepath.join(__dirname, path);
}

test('readFileAsync', async () => {
  expect.assertions(1);
  const buffer = await mfs.readFileAsync(resolve('data/a.txt'));
  expect(buffer.toString()).toBe('test\n');
});

test('readTextFileAsync', async () => {
  expect.assertions(1);
  await expect(mfs.readTextFileAsync(resolve('data/a.txt'))).resolves.toBe('test\n');
});

test('statOrNullAsync (An existent file)', async () => {
  expect.assertions(1);
  const stat = await mfs.statOrNullAsync(resolve('data/a.txt')) as fs.Stats;
  expect(stat.isFile()).toBe(true);
});

test('statOrNullAsync (A non-existent)', async () => {
  expect.assertions(1);
  const stat = await mfs.statOrNullAsync(resolve('___FILE__NOT_EXISTS')) as fs.Stats;
  expect(stat).toBeNull();
});

test('pathExists (An existent file)', async () => {
  expect.assertions(1);
  const exists = await mfs.pathExists(resolve('data/a.txt'));
  expect(exists).toBe(true);
});

test('pathExists (An non-existent file)', async () => {
  expect.assertions(1);
  const exists = await mfs.pathExists(resolve('___FILE__NOT_EXISTS'));
  expect(exists).toBe(false);
});

test('fileExists (An existent file)', async () => {
  expect.assertions(1);
  const exists = await mfs.fileExists(resolve('data/a.txt'));
  expect(exists).toBe(true);
});

test('fileExists (An non-existent file)', async () => {
  expect.assertions(1);
  const exists = await mfs.fileExists(resolve('___FILE__NOT_EXISTS'));
  expect(exists).toBe(false);
});

test('dirExists (An existent dir)', async () => {
  expect.assertions(1);
  const exists = await mfs.dirExists(resolve('data/a'));
  expect(exists).toBe(true);
});

test('dirExists (An non-existent dir)', async () => {
  expect.assertions(1);
  const exists = await mfs.dirExists(resolve('___FILE__NOT_EXISTS'));
  expect(exists).toBe(false);
});

test('listSubPaths (An existent dir)', async () => {
  expect.assertions(1);
  const paths = await mfs.listSubPaths(resolve('data'));
  expect(paths.sort()).toEqual(['a', 'b', 'a.txt', 'b.json'].sort());
});

test('listSubDirs (An existent dir)', async () => {
  expect.assertions(1);
  const paths = await mfs.listSubDirs(resolve('data'));
  expect(paths.sort()).toEqual(['a', 'b'].sort());
});

test('listSubFiles (An existent dir)', async () => {
  expect.assertions(1);
  const paths = await mfs.listSubFiles(resolve('data'));
  expect(paths.sort()).toEqual(['a.txt', 'b.json'].sort());
});

test('writeFileAsync (writes to an non-existent dir)', async () => {
  expect.assertions(1);
  // generate an random file name in tmp dir
  const tmp = nodepath.join(os.tmpdir(), `tmp-m-fs-${new Date().getTime()}`, 't.txt');
  await mfs.writeFileAsync(tmp, 'Abc');
  const content = await mfs.readTextFileAsync(tmp);
  expect(content).toBe('Abc');
});
