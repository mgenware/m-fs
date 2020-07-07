import * as fs from 'fs';
import * as nodepath from 'path';
import filterAsync from 'node-filter-async';
import * as mkDir from 'make-dir';

export const nodeWriteFileAsync = fs.promises.writeFile;
export const readFileAsync = fs.promises.readFile;
export const statAsync = fs.promises.stat;
export const readdirAsync = fs.promises.readdir;

export async function readTextFileAsync(path: string): Promise<string> {
  return await fs.promises.readFile(path, 'utf8');
}

export async function writeFileAsync(
  path: string,
  data: any,
  options?: fs.WriteFileOptions,
): Promise<void> {
  const dirPath = nodepath.dirname(path);
  await mkDir(dirPath);
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
  path: string,
  options?:
    | { encoding: BufferEncoding | null }
    | BufferEncoding
    | undefined
    | null,
): Promise<string[]> {
  return await readdirAsync(path, options);
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
