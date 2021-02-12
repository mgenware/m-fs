/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as nodepath from 'path';

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

export async function writeFileAsync(
  path: string,
  data: any,
  options?: fs.WriteFileOptions,
): Promise<void> {
  const dirPath = nodepath.dirname(path);
  await fs.promises.mkdir(dirPath, { recursive: true });
  await nodeWriteFileAsync(path, data, options as any);
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

export async function subPaths(
  dir: string,
  options?: (fs.BaseEncodingOptions & { withFileTypes?: false }) | BufferEncoding | null,
): Promise<string[]> {
  return readdirAsync(dir, options);
}

export interface PathInfo {
  path: string;
  isFile: boolean;
}

export async function subPathsWithType(
  dir: string,
  options?: (fs.BaseEncodingOptions & { withFileTypes?: false }) | BufferEncoding | null,
): Promise<PathInfo[]> {
  const paths = await subPaths(dir, options);
  return Promise.all(
    paths.map(async (path) => {
      const stat = await statAsync(nodepath.join(dir, path));
      const isFile = stat.isFile();
      return { path, isFile };
    }),
  );
}

export async function subDirs(dir: string): Promise<string[]> {
  const paths: string[] = await subPaths(dir);
  const dirs = await filterAsync(paths, async (path) => {
    const stat = await statAsync(nodepath.join(dir, path));
    return stat.isDirectory();
  });
  return dirs;
}

export async function subFiles(dir: string): Promise<string[]> {
  const paths: string[] = await subPaths(dir);
  const dirs = await filterAsync(paths, async (path) => {
    const stat = await statAsync(nodepath.join(dir, path));
    return stat.isFile();
  });
  return dirs;
}
