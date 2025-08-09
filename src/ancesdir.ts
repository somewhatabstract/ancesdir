import {AncesdirFn, Options} from "./types";
import {normalizeOptions} from "./normalize-options";
import {findMarker} from "./find-marker";

/**
 * Find the ancestral directory containing a specific marker file.
 *
 * This function searches for the ancestral directory that contains the
 * specified marker file, starting with the parent directory of the given path
 * or the parent directory of ancesdir's package directory.
 */
export const ancesdir: AncesdirFn = (
    fromOrOptions?: string | Partial<Omit<Options, "includeFrom">>,
    maybeMarker?: string,
): string => {
    const options = normalizeOptions(fromOrOptions, maybeMarker);

    return findMarker({
        ...options,
        includeFrom: false, // ancesdir does not include the starting location in the search
    });
};
