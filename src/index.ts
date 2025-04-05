import * as path from "path";
import * as fs from "fs";

import cache from "./cache";

const throwStartingPathNotAbsoluteMessage = (from: string): never => {
    throw new Error(
        `The starting path must be absolute, but "${from}" is relative`,
    );
};

const throwMarkerNotFoundMessage = (from: string, marker: string): never => {
    throw new Error(
        `Could not find marker, "${marker}", from given starting location "${from}"`,
    );
};

function ancesdirImpl(from: string, marker: string): string {
    if (!path.isAbsolute(from)) {
        throwStartingPathNotAbsoluteMessage(from);
    }

    const keys = [];

    /**
     * Rather than recurse, we keep the stack light and iterate.
     *
     * Our exit conditions are:
     *  - throw if we cached that the marker cannot be found
     *  - throw if we cannot find the marker
     *  - return cached result
     *  - return marker directory
     */
    let result = null;
    while (result == null) {
        const key = `${from}:${marker}`;
        keys.push(key);

        /**
         * If we have already looked this up, we can just grab it from our map!
         *
         * NOTE: If the marker was created after we cached the result, we will
         * still claim it cannot be found. Equally, if the marker was deleted
         * after we cached the result, we will still claim it was found.
         * The assumption is that a use of ancesdir is short-lived and such
         * scenarios aren't likely to occur. We could mitigate this by adding
         * the ability to clear the cache, or by making the cache invalidate
         * after a certain time period. Something to consider for a future
         * update, though no one has asked for it yet.
         */
        const cachedResult = cache.get(key);
        if (cachedResult != null) {
            result = cachedResult;
            continue;
        } else if (cache.has(key)) {
            // A null in the cache means we tried this lookup and never found
            // the marker.
            throwMarkerNotFoundMessage(from, marker);
        }

        /**
         * Our search location is the parent dir of the from point.
         */
        const parentDir = path.dirname(from);
        if (parentDir === from || parentDir == null) {
            /**
             * We've hit the end of our search. There's no match for this request.
             * We'll have to give up, cache our failure and throw an error.
             */
            for (const key of keys) {
                cache.set(key, null);
            }
            throwMarkerNotFoundMessage(from, marker);
        }

        /**
         * Right, let's see if the marker file exists at this location.
         *
         * If it does, cache that result for all keys we've tried to look up
         * and provide the result.
         *
         * Otherwise, change our from to the new parentdir and iterate.
         */
        const pathToCheck = path.join(parentDir, marker);
        if (fs.existsSync(pathToCheck)) {
            for (const key of keys) {
                cache.set(key, parentDir);
            }
            result = parentDir;
        } else {
            from = parentDir;
        }
    }
    return result;
}

function ancesdir(from?: string, marker?: string): string {
    /**
     * If we don't have a `from` path, then we want to go from our own package
     * directory's parent. So, we find our own package dir and start there.
     */
    from = from || ancesdir(__dirname);
    marker = marker || "package.json";

    return ancesdirImpl(from, marker);
}

export default ancesdir;
