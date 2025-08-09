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
        jest.spyOn(NormalizeOptions, "normalizeOptions").mockReturnValue({
            from: "/some/path",
            marker: "marker",
            includeFrom: true,
            force: true,
        });

        // Act
        ancesdir("/some/path", "marker");

        // Assert
        expect(spyFindMarker).toHaveBeenCalledWith({
            from: "/some/path",
            marker: "marker",
            includeFrom: false, // ancesdir does not include the starting location in the search
            force: true,
        });
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
