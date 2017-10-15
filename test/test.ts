import * as mfs from '../lib/main';
import * as fs from 'fs';
import * as nodepath from 'path';
import * as assert from 'assert';
import * as os from 'os';

function resolve(path: string): string {
  return nodepath.join(__dirname, path);
}

describe('readFileAsync', () => {
  it('Read a file', async () => {
    const buff = await mfs.readFileAsync(resolve('data/a.txt'));
    assert.deepEqual(buff, new Buffer('test\n'));
  });
});

describe('readTextFileAsync', () => {
  it('Read a text file', async () => {
    const str = await mfs.readTextFileAsync(resolve('data/a.txt'));
    assert.equal(str, 'test\n');
  });
});

describe('statOrNullAsync', () => {
  it('An existent file', async () => {
    const stat = await mfs.statOrNullAsync(resolve('data/a.txt')) as fs.Stats;
    assert.equal(stat.isFile(), true);
  });

  it('An non-existent file', async () => {
    const stat = await mfs.statOrNullAsync(resolve('___FILE__NOT_EXISTS')) as fs.Stats;
    assert.equal(stat, null);
  });
});

describe('pathExists', () => {
  it('An existent file', async () => {
    const exists = await mfs.pathExists(resolve('data/a.txt'));
    assert.equal(exists, true);
  });

  it('An non-existent file', async () => {
    const exists = await mfs.pathExists(resolve('___FILE__NOT_EXISTS'));
    assert.equal(exists, false);
  });
});

describe('fileExists', () => {
  it('An existent file', async () => {
    const exists = await mfs.fileExists(resolve('data/a.txt'));
    assert.equal(exists, true);
  });

  it('An non-existent file', async () => {
    const exists = await mfs.fileExists(resolve('___FILE__NOT_EXISTS'));
    assert.equal(exists, false);
  });
});

describe('dirExists', () => {
  it('An existent dir', async () => {
    const exists = await mfs.dirExists(resolve('data/a'));
    assert.equal(exists, true);
  });

  it('An non-existent dir', async () => {
    const exists = await mfs.dirExists(resolve('___FILE__NOT_EXISTS'));
    assert.equal(exists, false);
  });
});

describe('listSubPaths', () => {
  it('An existent dir', async () => {
    const paths = await mfs.listSubPaths(resolve('data'));
    assert.deepEqual(paths.sort(), ['data/a', 'data/b', 'data/a.txt', 'data/b.json'].map((f) => resolve(f)).sort());
  });
});
describe('listSubDirs', () => {
  it('An existent dir', async () => {
    const paths = await mfs.listSubDirs(resolve('data'));
    assert.deepEqual(paths.sort(), ['data/a', 'data/b'].map((f) => resolve(f)).sort());
  });
});
describe('listSubFiles', () => {
  it('An existent dir', async () => {
    const paths = await mfs.listSubFiles(resolve('data'));
    assert.deepEqual(paths.sort(), ['data/a.txt', 'data/b.json'].map((f) => resolve(f)).sort());
  });
});

describe('writeFileAsync', () => {
  it('write to an non-existent dir', async () => {
    // generate an random file name in tmp dir
    const tmp = nodepath.join(os.tmpdir(), `tmp-m-fs-${new Date().getTime()}`, 't.txt');
    await mfs.writeFileAsync(tmp, 'Abc');
    const content = await mfs.readTextFileAsync(tmp);
    assert.equal(content, 'Abc');
  });
});
