/**
 * Options for the ancesdir function.
 */
export interface Options {
    /**
     * The absolute path to start the search from.
     * If not provided, defaults to the package directory of the ancesdir
     * module.
     */
    from: string;

    /**
     * The marker to look for in the directory structure.
     * Defaults to "package.json".
     */
    marker: string;

    /**
     * Whether or not to include the starting location in the search.
     * If true, the search will start with the location specified by `from`,
     * rather than its parent directory.
     * If false, the search will start from the parent directory of `from`.
     * Defaults to false.
     */
    includeFrom: boolean;
}

export interface AncesdirFn {
    /**
     * Finds the ancestral directory containing a specific marker file.
     *
     * @param from - The absolute starting directory path. If not provided,
     * defaults to the package directory of the current module.
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
     * @param options - An object containing options for the search.
     * @returns The absolute path to the directory containing the marker file.
     * @throws Error if the marker file is not found in any parent directory.
     * @throws Error if the `from` path is not absolute.
     */
    (options?: Partial<Options>): string;
}
