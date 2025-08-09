# ancesdir

## 7.1.1

### Patch Changes

- a6e3c92: Update dev dependencies
- 39be91e: Update README

## 7.1.0

### Minor Changes

- 6270ce1: NEW: Added options-based call signature
- 2a4790a: NEW: Added `force` option to skip cache lookup for a call
- 54c633f: NEW: Added `closesdir` function - this is the same as `ancesdir` except that it will start the search at the beginning location rather than its parent
- 432fedc: NEW: Added `clearCache` function - clears the entire cache

## 7.0.0

### Major Changes

- 6c72352: Now throws more detailed errors

### Patch Changes

- 66de34b: Move to pnpm and update dev dependencies to latest

## 6.0.0

### Major Changes

- fcc3a96: BREAKING CHANGE:
    - Drop support for Node 16 and Node 18. Node 20 is now the minimum required version.

    HOUSEKEEPING:
    - Updated various development dependencies like eslint, prettier, typescript, babel, etc.

## 5.0.1

### Patch Changes

- 9254ed5: Update dependencies

## 5.0.0

### Major Changes

- e0d7909: Migrated to TypeScript and added new release process. Although this is functionally equivalent, the change from flow types to TypeScript could be a breaking change for folks development workflows, so this is a major release.
