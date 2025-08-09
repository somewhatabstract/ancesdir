const cache = new Map<string, string | null>();

/**
 * Set keys in the cache with a value.
 *
 * @param keys - An iterable of keys to set in the cache.
 * @param value - The value to set for the keys. If null, it indicates that
 *                the marker was not found at that location.
 */
export const setKeys = (keys: Iterable<string>, value: string | null): void => {
    for (const key of keys) {
        cache.set(key, value);
    }
};

/**
 * Get a value from the cache by key.
 *
 * @param key - The key to look up in the cache.
 * @returns The cached value or undefined if not found.
 */
export const getKey = (key: string): string | null | undefined =>
    cache.get(key);

/**
 * Clear the entire cache.
 *
 * This will remove all entries from the cache, forcing any new lookups
 * to fetch fresh data. Consider using the `force` option for `ancesdir` or
 * `closesdir` to force fresh lookups on a case-by-case basis if you want
 * to avoid invalidating the entire cache.
 */
export const clearCache = (): void => {
    cache.clear();
};
