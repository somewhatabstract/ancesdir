// @flow
import path from "path";
import fs from "fs";

import cache from "./cache.js";

function ancesdir(from?: string, marker?: string): string {
    /**
     * If we don't have a `from` path, then we want to go from our own package
     * directory's parent. So, we find our own package dir and start there.
     */
    from = from || ancesdir(__dirname);
    marker = marker || "package.json";

    if (!path.isAbsolute(from)) {
        throw new Error("From path must be absolute");
    }

    const key = `${from}:${marker}`;

    /**
     * If we have already looked this up, we can just grab it from our map!
     */
    const cachedResult = cache.get(key);
    if (cachedResult != null) {
        return cachedResult;
    }

    /**
     * Our starting search location is the parent dir of the from point.
     */
    const parentDir = path.dirname(from);
    if (parentDir === from || parentDir == null) {
        /**
         * We've hit the end of our search. There's no match for this request.
         * We'll have to give up.
         * We indicate this state as an error state.
         */
        throw new Error("No such marker found from given starting location");
    }

    /**
     * We haven't been asked for this yet, so let's get looking.
     * We do this recursively so that we cache each level on the way.
     * This means subsequent calls from those levels go straight from cache
     * rather than hitting the disk again.
     */
    const pathToCheck = path.join(parentDir, marker);
    const matchedPath = fs.existsSync(pathToCheck)
        ? pathToCheck
        : ancesdir(parentDir, marker);

    cache.set(key, matchedPath);
    return matchedPath;
}

export default ancesdir;
