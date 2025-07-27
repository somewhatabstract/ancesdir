import * as path from "node:path";
import * as fs from "node:fs";

import {setKeys, getKey} from "./cache";
import {Options} from "./types";
import {
    throwMarkerNotFoundMessage,
    throwStartingPathNotAbsoluteMessage,
} from "./errors";

/**
 * Find the marker file in the directory structure starting from a given path.
 *
 * @param {Options} options - The options for the search.
 * @param {string} options.from - The absolute path to start the search from.
 * @throws Error if the starting path is not absolute.
 * @throws Error if the marker cannot be found.
 */
export const findMarker = ({
    from: startingPoint,
    marker,
    includeFrom,
}: Options): string => {
    if (!path.isAbsolute(startingPoint)) {
        throwStartingPathNotAbsoluteMessage(startingPoint);
    }

    const getFromCacheOrThrow = (key: string): string | undefined => {
        const cachedValue = getKey(key);
        if (cachedValue != null) {
            return cachedValue;
        }
        if (cachedValue === null) {
            throwMarkerNotFoundMessage(startingPoint, marker);
        }
        return undefined;
    };

    const makeKey = (from: string, includeFrom: boolean): string =>
        includeFrom ? `includeFrom:${from}:${marker}` : `${from}:${marker}`;

    if (includeFrom) {
        // Before we roll our loop, let's check the cache for our starting
        // point under the includeFrom condition.
        const includeFromKey = makeKey(startingPoint, true);
        const cachedResult = getFromCacheOrThrow(includeFromKey);
        if (cachedResult != null) {
            // We found a cached result, so we can return it.
            return cachedResult;
        }

        // Let's check the disk.
        if (fs.existsSync(path.join(startingPoint, marker))) {
            // We found the marker at the starting point.
            setKeys([includeFromKey], startingPoint);
            return startingPoint;
        }
    }

    const keys = new Set<string>();

    /* Rather than recurse, we keep the stack light and iterate.

       Our exit conditions are:
        - throw if we cached that the marker cannot be found
        - throw if we cannot find the marker
        - return cached result
        - return marker directory */
    let result = null;
    let from = startingPoint;
    while (result == null) {
        // We use a cache so that subsequent calls can use the cached result
        // rather than having to search the file system again.
        const key = makeKey(from, false);
        keys.add(key);

        /* If we have already looked this up, we can just grab it from our map!

           NOTE: Because we cache our result, if the marker was created after
           we cached the result, we will claim it cannot be found. Equally, if
           the marker was deleted after we cached the result, we will claim it
           was found.

           The assumption is that a use of ancesdir is short-lived and such
           scenarios aren't likely to occur. We could mitigate this by adding
           the ability to clear the cache, or by making the cache invalidate
           after a certain time period. Something to consider for a future
           update, though no one has asked for it yet. */
        const cachedResult = getFromCacheOrThrow(key);
        if (cachedResult != null) {
            result = cachedResult;
            continue;
        }

        // Our search location is the parent dir of the current from point,
        // or the current point if includeFrom is true.
        const dirToCheck = path.dirname(from);
        if (dirToCheck === from || dirToCheck == null) {
            // We've hit the end of our search. There's no match.
            // We'll have to give up, cache our failure and throw an error.
            setKeys(keys, null);
            throwMarkerNotFoundMessage(startingPoint, marker);
        }

        // Let's see if the marker file exists at this location.
        const pathToCheck = path.join(dirToCheck, marker);
        if (fs.existsSync(pathToCheck)) {
            // The marker exists at this location.
            // We cache this location's result for all the keys we've tried.
            // We can also cache this as the includeFrom result for this
            // location.
            keys.add(makeKey(dirToCheck, true));
            setKeys(keys, dirToCheck);
            result = dirToCheck;
        } else {
            // We didn't find it. Let's update our from value and iterate.
            from = dirToCheck;
        }
    }
    return result;
};
