# m-fs

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://travis-ci.org/mgenware/m-fs.svg?branch=master)](http://travis-ci.org/mgenware/m-fs)
[![npm version](https://badge.fury.io/js/m-fs.svg)](https://badge.fury.io/js/m-fs)
[![Node.js Version](http://img.shields.io/node/v/m-fs.svg)](https://nodejs.org)

Common Node.js file system promises API.

### Installation

```bash
yarn add m-fs
npm install m-fs --save
```

Run tests:

```bash
yarn test
npm test
```

## Usage

JavaScript:

```javascript
const mfs = require('m-fs');
```

TypeScript:

```typescript
import * as mfs from 'm-fs';
```

## API

### `readFileAsync`

`fs.readFile` in a Promise.

### `nodeWriteFileAsync`

`fs.writeFile` in a Promise. Consider using `writeFileAsync` instead as `fs.writeFile` errors when it writes to a non-existent directory.

### `writeFileAsync`

Unlike `nodeWriteFileAsync`, this method makes ensure the target directory is created before writing the file.

### `statAsync`

`fs.stat` in a Promise.

### `statOrNullAsync`

Like `statAsync`, but returns `null` on error.

### `pathExists`, `dirExists`, `fileExists`

Returns `true` if the given path/directory/file exists.

### `subPaths`, `subDirs`, `subFiles`

```js
await subPaths('./data/docs');
// ['backup', 'resume.pdf', 'readme.md']

await subDirs('./data/docs');
// ['backup']

await subFiles('./data/docs');
// ['resume.pdf', 'readme.md']
```
