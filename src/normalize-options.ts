import {defaultFrom, defaultMarker} from "./defaults";
import {Options} from "./types";

/**
 * Normalize the options for the ancesdir function.
 *
 * This takes the possible call signatures for ancesdir and returns a
 * normalized Options object.
 *
 * @param {string | Partial<Options>} fromOrOptions - The starting path or
 * options object.
 * @param {string} [marker] - The marker file to search for.
 * @returns {Options} The normalized options.
 */
export const normalizeOptions = (
    fromOrOptions?: string | Partial<Options>,
    marker?: string,
): Options => {
    if (typeof fromOrOptions === "string") {
        return {
            force: false,
            from: fromOrOptions,
            includeFrom: false,
            marker: marker ?? defaultMarker,
        };
    }

    if (typeof fromOrOptions === "object" && fromOrOptions !== null) {
        return {
            force: fromOrOptions.force ?? false,
            from: fromOrOptions.from ?? defaultFrom(),
            marker: fromOrOptions.marker ?? defaultMarker,
            includeFrom: fromOrOptions.includeFrom ?? false,
        };
    }

    return {
        force: false,
        from: defaultFrom(),
        marker: defaultMarker,
        includeFrom: false,
    };
};
