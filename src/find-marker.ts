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
    force,
}: Options): string => {
    if (!path.isAbsolute(startingPoint)) {
        throwStartingPathNotAbsoluteMessage(startingPoint);
    }

    const getFromCache = (key: string): string | null | undefined =>
        // If we're forcing a search, we don't want to use the cache to look
        // up values.
        force ? undefined : getKey(key);

    const makeKey = (from: string, includeFrom: boolean): string => {
        const normalizedFrom = from.split(path.sep).join("/");
        return includeFrom
            ? `includeFrom:${normalizedFrom}:${marker}`
            : `${normalizedFrom}:${marker}`;
    };

    /* Every key we visit shares the final result, so we collect them and
       cache them all together once we know it, whether we got it from the
       disk or the cache, and whether or not the marker was found. */
    const keys: Array<string> = [];

    const settle = (result: string | null): string => {
        setKeys(keys, result);
        return result ?? throwMarkerNotFoundMessage(startingPoint, marker);
    };

    if (includeFrom) {
        // Before we roll our loop, let's check the cache for our starting
        // point under the includeFrom condition.
        const includeFromKey = makeKey(startingPoint, true);
        keys.push(includeFromKey);
        const cachedResult = getFromCache(includeFromKey);
        if (cachedResult !== undefined) {
            return settle(cachedResult);
        }

        // Let's check the disk.
        if (fs.existsSync(path.join(startingPoint, marker))) {
            // We found the marker at the starting point.
            return settle(startingPoint);
        }

        // It's not at the starting point, so the result is the same as the
        // search that excludes the starting point.
    }

    /* Rather than recurse, we keep the stack light and iterate.

       NOTE: Because we cache our result, if the marker was created after
       we cached the result, we will claim it cannot be found. Equally, if
       the marker was deleted after we cached the result, we will claim it
       was found.

       The assumption is that a use of ancesdir is short-lived and such
       scenarios aren't likely to occur. We could mitigate this by adding
       the ability to clear the cache, or by making the cache invalidate
       after a certain time period. Something to consider for a future
       update, though no one has asked for it yet. */
    let from = startingPoint;
    for (;;) {
        // If we have already looked this up, we can just grab it from our
        // map!
        const key = makeKey(from, false);
        keys.push(key);
        const cachedResult = getFromCache(key);
        if (cachedResult !== undefined) {
            return settle(cachedResult);
        }

        // Our search location is the parent dir of the current from point.
        const dirToCheck = path.dirname(from);
        if (dirToCheck === from || dirToCheck == null) {
            // We've hit the end of our search. There's no match.
            return settle(null);
        }

        // Searching above the current point is the same as searching from
        // its parent with includeFrom, so that key shares our result too,
        // and may already be cached.
        const dirToCheckKey = makeKey(dirToCheck, true);
        keys.push(dirToCheckKey);
        const cachedDirResult = getFromCache(dirToCheckKey);
        if (cachedDirResult !== undefined) {
            return settle(cachedDirResult);
        }

        // Let's see if the marker file exists at this location.
        if (fs.existsSync(path.join(dirToCheck, marker))) {
            return settle(dirToCheck);
        }

        // We didn't find it. Let's update our from value and iterate.
        from = dirToCheck;
    }
};
