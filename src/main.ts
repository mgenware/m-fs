import * as fs from 'fs';
import { FileHandle } from 'fs/promises';
import * as nodePath from 'path';
import { Stream } from 'stream';

export const nodeWriteFileAsync = fs.promises.writeFile;
export const readFileAsync = fs.promises.readFile;
export const statAsync = fs.promises.stat;
export const readdirAsync = fs.promises.readdir;

async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number) => Promise<boolean>,
  progressCb?: (value: T, index: number) => void,
): Promise<T[]> {
  const results: boolean[] = await Promise.all(
    array.map(async (value, index) => {
      const result = await callback(value, index);
      if (progressCb) {
        progressCb(value, index);
      }
      return result;
    }),
  );
  return array.filter((_, i) => results[i]);
}

export async function readTextFileAsync(path: string): Promise<string> {
  return fs.promises.readFile(path, 'utf8');
}

export async function mkdirp(path: string) {
  return fs.promises.mkdir(path, { recursive: true });
}

export async function writeFileAsync(
  path: fs.PathLike | FileHandle,
  data:
    | string
    | NodeJS.ArrayBufferView
    | Iterable<string | NodeJS.ArrayBufferView>
    | AsyncIterable<string | NodeJS.ArrayBufferView>
    | Stream,
): Promise<void> {
  if (typeof path === 'string') {
    const dirPath = nodePath.dirname(path);
    await fs.promises.mkdir(dirPath, { recursive: true });
  }
  await nodeWriteFileAsync(path, data);
}

export async function statOrNullAsync(path: string): Promise<fs.Stats | null> {
  try {
    return await statAsync(path);
  } catch {
    return null;
  }
}

export async function pathExists(path: string): Promise<boolean> {
  const stat = await statOrNullAsync(path);
  return !!stat;
}

export async function fileExists(path: string): Promise<boolean> {
  const stat = await statOrNullAsync(path);
  if (stat && stat.isFile()) {
    return true;
  }
  return false;
}

export async function dirExists(path: string): Promise<boolean> {
  const stat = await statOrNullAsync(path);
  if (stat && stat.isDirectory()) {
    return true;
  }
  return false;
}

export async function subPaths(dir: string): Promise<string[]> {
  return readdirAsync(dir);
}

export interface PathInfo {
  path: string;
  isFile: boolean;
}

export async function subPathsWithType(dir: string): Promise<PathInfo[]> {
  const paths = await subPaths(dir);
  return Promise.all(
    paths.map(async (path) => {
      const stat = await statAsync(nodePath.join(dir, path));
      const isFile = stat.isFile();
      return { path, isFile };
    }),
  );
}

export async function subDirs(dir: string): Promise<string[]> {
  const paths: string[] = await subPaths(dir);
  const dirs = await filterAsync(paths, async (path) => {
    const stat = await statAsync(nodePath.join(dir, path));
    return stat.isDirectory();
  });
  return dirs;
}

export async function subFiles(dir: string): Promise<string[]> {
  const paths: string[] = await subPaths(dir);
  const dirs = await filterAsync(paths, async (path) => {
    const stat = await statAsync(nodePath.join(dir, path));
    return stat.isFile();
  });
  return dirs;
}
