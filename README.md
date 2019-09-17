# ancesdir

[![Node CI](https://github.com/somewhatabstract/ancesdir/workflows/Node%20CI/badge.svg)](https://github.com/somewhatabstract/ancesdir/actions) [![codecov](https://codecov.io/gh/somewhatabstract/ancesdir/branch/master/graph/badge.svg)](https://codecov.io/gh/somewhatabstract/ancesdir)

Find a specific ancestor/root directory given a starting location and a search parameter

There are a few packages out there that already support finding the root directory of a project, based off assumptions like that directory containing `package.json` or `node_modules`. However, this is not always the case. I needed a way to find an ancestor directory that may not always have these markers. So, this provides the means to specific a custom marker file or directory as the means to identify the ancestor that you may need.

This may be useful in a variety of situations. For example, a monorepo where you want to differentiate in development scripts between the root folder of each package, and the root folder of the entire repository.

## Usage

`yarn add ancesdir` or `npm install ancesdir`

### Default

```javascript
import ancesdir from "ancesdir";

console.log(ancesdir());
```

Outputs the absolute path of the first parent directory to the `ancesdir` package that contains `package.json`.

In most cases, this is likely all you need.

### From Specific Location

```javascript
import ancesdir from "ancesdir";

console.log(ancesdir(__dirname));
```

Outputs the absolute path of the first parent directory to `__dirname` that contains `package.json`.

### Custom Target From Specific Location

```javascript
import ancesdir from "ancesdir";

console.log(ancesdir(__dirname, ".mymarkerfile");
```

Outputs the absolute path of the first parent directory that contains a file or directory called `.mymarkerfile`.

This is useful if you don't have a classic file hierarchy or you want to use this for more advanced use cases where having control over the file system item that identifies your ancestor is useful.
