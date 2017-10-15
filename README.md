# m-fs
Promise version of common Node.js fs methods

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

### `readdirAsync`
Promisified `fs.readdir`.

### `listSubPaths`, `listSubDirs`, `listSubFiles`
Unlike `readdirAsync`, these methods will join the result path to the source path you passed in:
```javascript
await readdirAsync('./data/docs');
// ['resume.pdf', 'readme.md']

await listSubPaths('./data/docs');
// ['./data/docs/resume.pdf', './data/docs/readme.md']
```