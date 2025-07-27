import fs from "node:fs";
import path from "node:path";

jest.mock("node:fs");
jest.mock("node:path");

describe("findMarker", () => {
    let findMarker: typeof import("../find-marker").findMarker;
    let cache: typeof import("../cache");
    beforeEach(() => {
        jest.isolateModules(() => {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            findMarker = require("../find-marker").findMarker;
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            cache = require("../cache");
        });
    });

    it("should throw if from path is not absolute", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(false);

        // Act
        const underTest = () =>
            findMarker({
                force: false,
                from: "./path",
                marker: "marker",
                includeFrom: false,
            });

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"The starting path must be absolute, but "./path" is relative"`,
        );
    });

    describe("force is false", () => {
        it("should lookup request in cache", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(cache, "getKey").mockReturnValue("CACHE RESULT!");

            // Act
            const result = findMarker({
                force: false,
                from: "/Absolute/Path",
                marker: "marker",
                includeFrom: false,
            });

            // Assert
            expect(result).toBe("CACHE RESULT!");
        });

        it("should throw if we cached that marker was not found", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(cache, "getKey").mockReturnValue(null);

            // Act
            const underTest = () =>
                findMarker({
                    force: false,
                    from: "/Absolute/Path",
                    marker: "markerwewontfind",
                    includeFrom: false,
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Could not find marker, "markerwewontfind", from given starting location "/Absolute/Path""`,
            );
        });
    });

    describe("force is true", () => {
        it("should not lookup request in cache", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(cache, "getKey").mockReturnValue("CACHE RESULT!");

            // Act
            const underTest = () =>
                findMarker({
                    force: true,
                    from: "/Absolute/Path",
                    marker: "marker",
                    includeFrom: false,
                });

            // Assert
            expect(underTest).toThrow();
        });
    });

    it("should throw if marker never found", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(path, "dirname").mockImplementationOnce((f: any) => f);

        // Act
        const underTest = () =>
            findMarker({
                force: false,
                from: "/Absolute/Path",
                marker: "markerwewontfind",
                includeFrom: false,
            });

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Could not find marker, "markerwewontfind", from given starting location "/Absolute/Path""`,
        );
    });

    it("should throw if we reach the end of the directory structure without finding marker", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(path, "dirname").mockReturnValue("/");

        // Act
        const underTest = () =>
            findMarker({
                force: false,
                from: "/Absolute/Path",
                marker: "markerwewontfind",
                includeFrom: false,
            });

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Could not find marker, "markerwewontfind", from given starting location "/Absolute/Path""`,
        );
    });

    it("should continue up directory structure to find marker file", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(path, "dirname").mockImplementation((f: any) => {
            if (f === path.join("Absolute", "Path", "Here")) {
                return path.join("Absolute", "Path");
            }
            if (f === path.join("Absolute", "Path")) {
                return "Absolute";
            }
            throw new Error(`Should not get here: ${f}`);
        });
        jest.spyOn(path, "join").mockImplementation((...args: any) => {
            return jest.requireActual("path").join(...args);
        });
        jest.spyOn(fs, "existsSync").mockImplementation((f: any) => {
            if (f === path.join("Absolute", "package.json")) {
                return true;
            }
            return false;
        });

        // Act
        const result = findMarker({
            force: false,
            from: path.join("Absolute", "Path", "Here"),
            marker: "package.json",
            includeFrom: false,
        });

        // Assert
        expect(result).toBe("Absolute");
    });

    it("should cache the location of the found marker for all checked keys and the includeFrom key", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(path, "dirname").mockImplementation(
            jest.requireActual("path").dirname,
        );
        jest.spyOn(path, "join").mockImplementation(
            jest.requireActual("path").join,
        );
        jest.spyOn(fs, "existsSync").mockImplementation((f: any) => {
            if (f === path.join("Absolute", "package.json")) {
                return true;
            }
            return false;
        });
        const setKeysSpy = jest.spyOn(cache, "setKeys");

        // Act
        findMarker({
            force: false,
            from: path.join("Absolute", "Path", "Here"),
            marker: "package.json",
            includeFrom: false,
        });

        // Assert
        expect(setKeysSpy).toHaveBeenCalledWith(
            [
                "Absolute/Path/Here:package.json",
                "Absolute/Path:package.json",
                "includeFrom:Absolute:package.json",
            ],
            "Absolute",
        );
    });

    describe("includeFrom is true", () => {
        it("should return the starting point if it contains the marker file", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(fs, "existsSync").mockReturnValue(true);
            jest.spyOn(cache, "setKeys").mockImplementation(() => {});

            // Act
            const result = findMarker({
                force: false,
                from: "/Absolute/Path",
                marker: "marker",
                includeFrom: true,
            });

            // Assert
            expect(result).toBe("/Absolute/Path");
        });

        it("should return cache for includeFrom key when force is false", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(fs, "existsSync").mockReturnValue(true);
            jest.spyOn(cache, "getKey").mockImplementation((key) =>
                key === "includeFrom:/Absolute/Path:marker"
                    ? "/Absolute/Path"
                    : undefined,
            );
            jest.spyOn(cache, "setKeys").mockImplementation(() => {});

            // Act
            const result = findMarker({
                force: false,
                from: "/Absolute/Path",
                marker: "marker",
                includeFrom: true,
            });

            // Assert
            expect(result).toBe("/Absolute/Path");
        });

        it("should not check cache for includeFrom key when force is true", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(fs, "existsSync").mockReturnValue(true);
            const getKeySpy = jest.spyOn(cache, "getKey");
            jest.spyOn(cache, "setKeys").mockImplementation(() => {});

            // Act
            try {
                findMarker({
                    force: true,
                    from: "/Absolute/Path",
                    marker: "marker",
                    includeFrom: true,
                });
            } catch {
                /* ignore */
            }

            // Assert
            expect(getKeySpy).not.toHaveBeenCalledWith(
                "includeFrom:/Absolute/Path:marker",
            );
        });
    });

    describe("includeFrom is false", () => {
        it("should not find the marker file if it only exists at the starting point", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(fs, "existsSync").mockReturnValue(true);
            jest.spyOn(cache, "setKeys").mockImplementation(() => {});

            // Act
            const underTest = () =>
                findMarker({
                    force: false,
                    from: "/Absolute/Path",
                    marker: "marker",
                    includeFrom: false,
                });

            // Assert
            expect(underTest).toThrow();
        });

        it("should not check cache for includeFrom key", () => {
            // Arrange
            jest.spyOn(path, "isAbsolute").mockReturnValue(true);
            jest.spyOn(fs, "existsSync").mockReturnValue(true);
            const getKeySpy = jest.spyOn(cache, "getKey");
            jest.spyOn(cache, "setKeys").mockImplementation(() => {});

            // Act
            try {
                findMarker({
                    force: false,
                    from: "/Absolute/Path",
                    marker: "marker",
                    includeFrom: false,
                });
            } catch {
                /* ignore */
            }

            // Assert
            expect(getKeySpy).not.toHaveBeenCalledWith(
                "includeFrom:/Absolute/Path:marker",
            );
        });
    });
});
