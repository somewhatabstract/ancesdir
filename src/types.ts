/**
 * Options for the ancesdir function.
 */
export interface Options {
    /**
     * Whether to force a full search, or to use the cache.
     * If true, the search will ignore any cached results and search the
     * file system for the marker, updating the cache with the results.
     * Otherwise, it will use the cached results when available.
     * Defaults to false.
     */
    force: boolean;

    /**
     * The absolute path to start the search from.
     * If not provided, defaults to the package directory of the ancesdir
     * module.
     */
    from: string;

    /**
     * Whether or not to include the starting location in the search.
     * If true, the search will start with the location specified by `from`,
     * rather than its parent directory.
     * If false, the search will start from the parent directory of `from`.
     * Defaults to false.
     */
    includeFrom: boolean;

    /**
     * The marker to look for in the directory structure.
     * Defaults to "package.json".
     */
    marker: string;
}

export interface AncesdirFn {
    /**
     * Finds the ancestral directory containing a specific marker file.
     *
     * The starting `from` location is not included in the search.
     * @see {@link closesdir} for a version that includes the starting
     * location in the search.
     *
     * @param from - The absolute starting directory path. If not provided,
     * defaults to the package directory of ancesdir.
     * @param marker - The marker file name to search for. Defaults to
     * "package.json".
     * @returns The absolute path to the directory containing the marker file.
     * @throws Error if the marker file is not found in any parent directory.
     * @throws Error if the `from` path is not absolute.
     */
    (from?: string, marker?: string): string;

    /**
     * Finds the ancestral directory containing a specific marker file.
     *
     * Defaults to starting the search in ancesdir's package directory.
     * The default marker is "package.json". Rhe starting `from`
     * location is not included in the search; see {@link closesdir} if you
     * want this behavior.
     *
     * @param options - An object containing options for the search.
     * @returns The absolute path to the directory containing the marker file.
     * @throws Error if the marker file is not found in any parent directory.
     * @throws Error if the `from` path is not absolute.
     */
    (options?: Partial<Omit<Options, "includeFrom">>): string;
}

export interface ClosesdirFn {
    /**
     * Finds the closest directory containing a specific marker file.
     *
     * This function is similar to ancesdir, except this function includes the
     * starting `from` location in the search. If you only want to look at
     * parent directories, @see {@link ancesdir}.
     *
     * @param from - The absolute starting directory path. If not provided,
     * defaults to the package directory of ancesdir.
     * @param marker - The marker file name to search for. Defaults to
     * "package.json".
     * @returns The absolute path to the directory containing the marker file.
     * @throws Error if the marker file is not found in any parent directory.
     * @throws Error if the `from` path is not absolute.
     */
    (from?: string, marker?: string): string;

    /**
     * Finds the closest directory containing a specific marker file.
     *
     * Defaults to starting the search in ancesdir's package directory.
     * The default marker is "package.json". The starting `from`
     * location is included in the search; see {@link ancesdir} if you do no
     * want this behavior.
     *
     * @param options - An object containing options for the search.
     * @returns The absolute path to the directory containing the marker file.
     * @throws Error if the marker file is not found in any parent directory.
     * @throws Error if the `from` path is not absolute.
     */
    (options?: Partial<Omit<Options, "includeFrom">>): string;
}
