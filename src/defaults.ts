import {findMarker} from "./find-marker";

/**
 * Get the default starting path for the ancesdir function.
 *
 * If we don't have a `from` path, then we want to go from our own package
 * directory's parent. So, we find our own package dir and start there.
 *
 * @return {string} The absolute path to the default starting directory.
 */
export const defaultFrom = (): string =>
    findMarker({
        force: false,
        from: __dirname,
        marker: defaultMarker,
        includeFrom: false,
    });

/**
 * The default marker file to look for in the directory structure.
 */
export const defaultMarker = "package.json";
