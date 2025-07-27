import {ancesdir} from "../ancesdir";

import * as NormalizeOptions from "../normalize-options";
import * as FindMarker from "../find-marker";

jest.mock("../normalize-options");
jest.mock("../find-marker");

describe("ancesdir", () => {
    it("should normalize options", () => {
        // Arrange
        const spyNormalizeOptions = jest.spyOn(
            NormalizeOptions,
            "normalizeOptions",
        );

        // Act
        ancesdir("/some/path", "marker");

        // Assert
        expect(spyNormalizeOptions).toHaveBeenCalledWith(
            "/some/path",
            "marker",
        );
    });

    it("should invoke findMarker with normalized options", () => {
        // Arrange
        const spyFindMarker = jest.spyOn(FindMarker, "findMarker");
        jest.spyOn(NormalizeOptions, "normalizeOptions").mockReturnValue(
            "FAKE_OPTIONS" as any,
        );

        // Act
        ancesdir("/some/path", "marker");

        // Assert
        expect(spyFindMarker).toHaveBeenCalledWith("FAKE_OPTIONS");
    });

    it("should return the result of findMarker", () => {
        // Arrange
        jest.spyOn(FindMarker, "findMarker").mockReturnValue("FAKE_RESULT");

        // Act
        const result = ancesdir("/some/path", "marker");

        // Assert
        expect(result).toBe("FAKE_RESULT");
    });
});
