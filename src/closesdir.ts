import {findMarker} from "./find-marker";
import {normalizeOptions} from "./normalize-options";
import {Options} from "./types";

/**
 * Find the closest directory containing a specific marker file.
 *
 * This function is similar to ancesdir, but it includes the starting
 * directory in the search. It returns the closest directory that contains
 * the specified marker file, starting from the given path or ancesdir's
 * package directory.
 */
export function closesdir(
    fromOrOptions?: string | Partial<Omit<Options, "includeFrom">>,
    maybeMarker?: string,
): string {
    const normalizedOptions = normalizeOptions(fromOrOptions, maybeMarker);
    return findMarker({
        ...normalizedOptions,
        includeFrom: true,
    });
}
