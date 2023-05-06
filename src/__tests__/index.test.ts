import fs from "fs";
import path from "path";

import cache from "../cache";
import ancesdir from "../index";

jest.mock("path");

describe("ancesdir", () => {
    it("should throw if from path is not absolute", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(false);

        // Act
        const underTest = () => ancesdir("./path");

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"From path must be absolute"`,
        );
    });

    it("should lookup request in cache", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(cache, "get").mockReturnValue("CACHE RESULT!");

        // Act
        const result = ancesdir("/Absolute/Path", "marker");

        // Assert
        expect(result).toBe("CACHE RESULT!");
    });

    it("should throw if marker never found", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(cache, "get").mockReturnValue(null);
        jest.spyOn(path, "dirname").mockImplementationOnce((f: any) => f);

        // Act
        const underTest = () => ancesdir("/Absolute/Path", "markerwewontfind");

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"No such marker found from given starting location"`,
        );
    });

    it("should throw if we cached marker was not found", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(cache, "get").mockReturnValue(null);
        jest.spyOn(cache, "has").mockReturnValue(true);

        // Act
        const underTest = () => ancesdir("/Absolute/Path", "markerwewontfind");

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"No such marker found from given starting location"`,
        );
    });

    it("should default marker to package.json", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(cache, "get").mockReturnValue(null);
        jest.spyOn(path, "dirname").mockImplementationOnce(
            (f: any) => "PARENTDIR",
        );
        jest.spyOn(fs, "existsSync").mockReturnValue(true);
        const joinSpy = jest.spyOn(path, "join").mockReturnValue("MARKERPATH");

        // Act
        ancesdir("/Absolute/Path");

        // Assert
        expect(joinSpy).toHaveBeenCalledWith("PARENTDIR", "package.json");
    });

    it("should default from argument as folder of ancesdir implementation", () => {
        // Arrange
        const realPath = jest.requireActual("path");
        const pathToIndexJS = realPath.dirname(
            realPath.normalize(realPath.join(__dirname, "../index.js")),
        );
        const pretendPackageFolder = "PRETEND_PACKAGE_FOLDER";
        jest.spyOn(path, "isAbsolute").mockImplementation((f: any) => {
            if (f === pathToIndexJS || f === pretendPackageFolder) {
                // If it's the dirname we expect to be asked for.
                // Or it's the result of the initial call to default to our
                // package, which is the cached result.
                return true;
            }
            // Otherwise return false so that we throw.
            // That then means that if it throws and fails, we know things went
            // wrong.
            return false;
        });
        jest.spyOn(cache, "get").mockImplementation((key: string) => {
            if (key.startsWith(pathToIndexJS)) {
                return pretendPackageFolder;
            }
            if (key.startsWith(pretendPackageFolder)) {
                return "FINAL_RESULT";
            }
            throw new Error("Should not get a request that hits this");
        });

        // Act
        const result = ancesdir();

        // Assert
        expect(result).toBe("FINAL_RESULT");
    });

    it("should continue up directory structure to find marker file", () => {
        // Arrange
        jest.spyOn(path, "isAbsolute").mockReturnValue(true);
        jest.spyOn(cache, "get").mockReturnValue(null);
        jest.spyOn(cache, "has").mockReturnValue(false);
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
        const result = ancesdir(
            path.join("Absolute", "Path", "Here"),
            "package.json",
        );

        // Assert
        expect(result).toBe("Absolute");
    });
});
