# m-fs

[![Build Status](https://github.com/mgenware/m-fs/workflows/Build/badge.svg)](https://github.com/mgenware/m-fs/actions)
[![npm version](https://img.shields.io/npm/v/m-fs.svg?style=flat-square)](https://npmjs.com/package/m-fs)
[![Node.js Version](http://img.shields.io/node/v/m-fs.svg?style=flat-square)](https://nodejs.org/en/)

Helper functions for node fs.

## Installation

```sh
npm add m-fs
```

## Usage

```ts
import * as mfs from 'm-fs';
```

## API

### `readFileAsync`

Calls `fs.promises.readFile`.

### `writeFileAsync`

Calls `fs.promises.writeFile`. This method also makes ensure the target directory is created before writing the file.

### `statAsync`

Calls `fs.promises.stat`.

### `statOrNullAsync`

Like `statAsync`, but instead of throwing an error, it returns `null` in that case.

### `pathExists`, `dirExists`, `fileExists`

Returns `true` if the given path/directory/file exists.

### `subPaths`, `subDirs`, `subFiles`

```ts
await subPaths('./data/docs');
// ['backup', 'resume.pdf', 'readme.md']

await subPathsWithType('./data/docs');
// [{ path: 'backup', isFile: false }, { path: 'resume.pdf', isFile: true }, { path: 'readme.md', isFile: true }]

await subDirs('./data/docs');
// ['backup']

await subFiles('./data/docs');
// ['resume.pdf', 'readme.md']
```

### `mkdirp`

Calls `fs.promises.mkdir` with `{ recursive: true }`.
