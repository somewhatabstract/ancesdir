let cache: typeof import("../cache");
beforeEach(() => {
    jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        cache = require("../cache");
    });
});

describe("getKey", () => {
    it.each`
        value
        ${null}
        ${"somevalue"}
    `("should return the $value for a key", ({value}) => {
        // Arrange
        const key = "testKey";
        cache.setKeys([key], value);

        // Act
        const result = cache.getKey(key);

        // Assert
        expect(result).toBe(value);
    });

    it("should return undefined if the key is not in the cache", () => {
        // Act
        const result = cache.getKey("undefinedKey");

        // Assert
        expect(result).toBeUndefined();
    });
});

describe("setKeys", () => {
    it.each`
        value
        ${"testValue"}
        ${null}
    `("should set multiple keys to the $value", ({value}) => {
        // Arrange
        const keys = ["key1", "key2", "key3"];

        // Act
        cache.setKeys(keys, value);

        // Assert
        keys.forEach((key) => {
            expect(cache.getKey(key)).toBe(value);
        });
    });
});

describe("clearCache", () => {
    it("should clear all entries in the cache", () => {
        // Arrange
        const keys = ["key1", "key2"];
        cache.setKeys(keys, "testValue");

        // Act
        cache.clearCache();
        const result = keys.map((k) => cache.getKey(k));

        // Assert
        expect(result).toEqual([undefined, undefined]);
    });
});
