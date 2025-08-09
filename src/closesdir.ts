import path from "node:path";
import {findMarker} from "./find-marker";
import {normalizeOptions} from "./normalize-options";
import {ClosesdirFn, Options} from "./types";
import {defaultFrom} from "./defaults";

/**
 * Find the closest directory containing a specific marker file.
 *
 * This function is similar to ancesdir, but it includes the starting
 * directory in the search. It returns the closest directory that contains
 * the specified marker file, starting from the given path or the parent
 * directory of ancesdir's package directory.
 */
export const closesdir: ClosesdirFn = (
    fromOrOptions?: string | Partial<Omit<Options, "includeFrom">>,
    maybeMarker?: string,
): string => {
    const normalizedOptions = normalizeOptions(fromOrOptions, maybeMarker);

    if (normalizedOptions.from === defaultFrom()) {
        // If no 'from' is provided, use the parent of the defaultFrom folder
        normalizedOptions.from = path.dirname(normalizedOptions.from);
    }

    return findMarker({
        ...normalizedOptions,
        includeFrom: true,
    });
};
