# ancesdir

[![Node CI](https://github.com/somewhatabstract/ancesdir/workflows/Node%20CI/badge.svg)](https://github.com/somewhatabstract/ancesdir/actions) [![codecov](https://codecov.io/gh/somewhatabstract/ancesdir/branch/main/graph/badge.svg)](https://codecov.io/gh/somewhatabstract/ancesdir) [![npm (tag)](https://img.shields.io/npm/v/ancesdir/latest)](https://www.npmjs.com/package/ancesdir) [![Node Version Required](https://img.shields.io/node/v/ancesdir/latest)](https://img.shields.io/node/v/ancesdir/latest)

`ancesdir` provides a simple, yet versatile function to find a specific ancestor/root directory given a starting location and a search parameter

There are a few packages out there that already support finding the root directory of a project based off assumptions like that directory containing `package.json` or `node_modules`. However, this is not always the case. I needed a way to find an ancestor directory that may not always have these markers. So, this provides the means to specify a custom marker file or directory as the means to identify the ancestor that you may need.

This may be useful in a variety of situations. For example, a monorepo where you want to differentiate in development scripts between the root folder of each package, and the root folder of the entire repository.

## Getting Started

### pnpm

**`pnpm add ancesdir`**

### yarn

**`yarn add ancesdir`**

### npm

 **`npm install ancesdir`**

## Usage

### `ancesdir`

This method finds the first ancestor directory that contains a file or directory called `package.json` by default, or a custom marker file or directory if specified. The search starts with the
parent of the given location.

#### Default

```typescript
import {ancesdir} from "ancesdir";

console.log(ancesdir());
```

Outputs the absolute path of the first parent directory to the `ancesdir` package that contains `package.json`.

In most cases, this is likely all you need.

#### From Specific Location

```typescript
import {ancesdir} from "ancesdir";

console.log(ancesdir(__dirname));
```

Outputs the absolute path of the first parent directory to `__dirname` that contains `package.json`.

#### Custom Target From Specific Location

```typescript
import {ancesdir} from "ancesdir";

console.log(ancesdir(__dirname, ".mymarkerfile");
```

Outputs the absolute path of the first parent directory that contains a file or directory called `.mymarkerfile`.

This is useful if you don't have a classic file hierarchy or you want to use this for more advanced use cases where having control over the file system item that identifies your ancestor is useful.

### `closesdir`

The `closesdir` export provides a similar function to `ancesdir`, except that
it starts the search in the starting directory, rather than its parent.

#### Default

```typescript
import {closesdir} from "closesdir";

console.log(closesdir());
```

Outputs the absolute path of the first parent directory to the `ancesdir` package that contains `package.json`. This is the same as calling `ancesdir()`.

#### From Specific Location

```typescript
import {closesdir} from "closesdir";

console.log(closesdir(__dirname));
```

Outputs the absolute path of the first directory that contains `package.json`, starting with `__dirname` and then moving up the directory tree.

#### Custom Target From Specific Location

```typescript
import {closesdir} from "closesdir";

console.log(closesdir(__dirname, ".mymarkerfile");
```

Outputs the absolute path of the first directory that contains a file or directory called `.mymarkerfile`, starting with `__dirname` and then moving up the directory tree.

This is useful if you don't have a classic file hierarchy or you want to use this for more advanced use cases where having control over the file system item that identifies your target directory is useful.

### Options

Both `ancesdir` and `closesdir` support an options object as the second argument. This allows you to customize the behavior of the search via those
options rather than individual arguments.

```typescript
type Options = {
    /**
     * Whether to force a full search, or to use the cache.
     * If true, the search will ignore any cached results and search the
     * file system for the marker, updating the cache with the results.
     * Otherwise, it will use the cached results when available.
     * Defaults to false.
     */
    force?: boolean;

    /**
     * The absolute path to start the search from.
     * If not provided:
     * - For `ancesdir` calls, defaults to the package directory of the
     *   `ancesdir` module.
     * - For `closesdir` calls, defaults to the parent directory of the
     *   `ancesdir` module.
     */
    from?: string;

    /**
     * The marker to look for in the directory structure.
     * Defaults to "package.json".
     */
    marker?: string;
};
```

### Caching

All requests are cached so that subsequent calls to the same directory or any
directory checked during the search do not require a new search. This is useful if you are calling this function multiple times in a single run of your program.

However, there may be times where you want to clear the cache, or force a specific request to be made without using the cache. For this, you can use the `clearCache`, or `force` options.

#### Clear Cache

```typescript
import {clearCache} from "ancesdir";

clearCache();
```

This will clear all cached results, so that subsequent calls to `ancesdir` or `closesdir` will start to rebuild the cache from scratch based on the current state of the file system.

#### Force Request

Both `ancesdir` and `closesdir` support a call signature that takes an `options` object. One of those options is a `force` boolean. If this is set to `true`, the function will not use the cache for the request and will always instead perform a new search, updating the cache in the process for that search.

This is less impactful than clearing the cache with `clearCache`, as it only affects the specific request being made, rather than all requests.

```typescript
import {ancesdir} from "ancesdir";

ancesdir({force: true});
```

```typescript
import {closesdir} from "closesdir";

closesdir({force: true});
```
