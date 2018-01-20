# m-fs

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://travis-ci.org/mgenware/m-fs.svg?branch=master)](http://travis-ci.org/mgenware/m-fs)
[![npm version](https://badge.fury.io/js/m-fs.svg)](https://badge.fury.io/js/m-fs)
[![Node.js Version](http://img.shields.io/node/v/m-fs.svg)](https://nodejs.org)

Promise version of common Node.js fs methods.

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
import mfs from 'm-fs';
```

## API
### `readFileAsync`
Promisified `fs.readFile`.

### `nodeWriteFileAsync`
Promisified `fs.writeFile`. Consider using `writeFileAsync` instead. Because `fs.writeFile` would return an error if write to a non-existing directory.

### `writeFileAsync`
Unlike `nodeWriteFileAsync`, this method will ensure directory is created before writing the file.

### `statAsync`
Promisified `fs.stat`.

### `statOrNullAsync`
Like `statAsync`, but returns `null` if error happened.

### `pathExists`, `dirExists`, `fileExists`
Returns `true` if a given path|dir|file exists.

### `listSubPaths`, `listSubDirs`, `listSubFiles`
```javascript
await listSubPaths('./data/docs');
// ['backup', 'resume.pdf', 'readme.md']

await listSubDirs('./data/docs');
// ['backup']

await listSubFiles('./data/docs');
// ['resume.pdf', 'readme.md']
```
