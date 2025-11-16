import {ancesdir} from "./ancesdir";

// TODO: Delete the default export in the next major release.
// NOTE: Needed to import and assign to a variable for the deprecation to
// be picked up properly; it didn't work when applied to
// the export statement directly.
/**
 * @deprecated Use named import instead: `import {ancesdir} from "ancesdir";`
 * The default export will be removed in a future major release.
 */
const defaultExport = ancesdir;
export default defaultExport;

export {ancesdir};
export {closesdir} from "./closesdir";
export {clearCache} from "./cache";
