import {closesdir} from "../closesdir";

import * as NormalizeOptions from "../normalize-options";
import * as FindMarker from "../find-marker";
import * as Defaults from "../defaults";

jest.mock("../normalize-options");
jest.mock("../find-marker");

describe("closesdir", () => {
    it("should normalize options", () => {
        // Arrange
        const spyNormalizeOptions = jest
            .spyOn(NormalizeOptions, "normalizeOptions")
            .mockReturnValue({
                from: "/some/path",
                marker: "marker",
                includeFrom: false,
                force: true,
            });

        // Act
        closesdir("/some/path", "marker");

        // Assert
        expect(spyNormalizeOptions).toHaveBeenCalledWith(
            "/some/path",
            "marker",
        );
    });

    it("should invoke findMarker with normalized options and includeFrom=true", () => {
        // Arrange
        const spyFindMarker = jest.spyOn(FindMarker, "findMarker");
        jest.spyOn(NormalizeOptions, "normalizeOptions").mockReturnValue({
            from: "/some/path",
            marker: "marker",
            includeFrom: false,
            force: true,
        });

        // Act
        closesdir("/some/path", "marker");

        // Assert
        expect(spyFindMarker).toHaveBeenCalledWith({
            from: "/some/path",
            marker: "marker",
            includeFrom: true,
            force: true,
        });
    });

    it("should call findMarker with the parent of the default folder if the from would be the default folder", () => {
        // Arrange
        jest.spyOn(Defaults, "defaultFrom").mockReturnValue(
            "/default/parent/path",
        );
        const spyFindMarker = jest.spyOn(FindMarker, "findMarker");
        jest.spyOn(NormalizeOptions, "normalizeOptions").mockReturnValue({
            from: "/default/parent/path",
            marker: "marker",
            includeFrom: true,
            force: true,
        });

        // Act
        closesdir();

        // Assert
        expect(spyFindMarker).toHaveBeenCalledWith(
            expect.objectContaining({
                from: "/default/parent",
            }),
        );
    });

    it("should return the result of findMarker", () => {
        // Arrange
        jest.spyOn(FindMarker, "findMarker").mockReturnValue("FAKE_RESULT");
        jest.spyOn(NormalizeOptions, "normalizeOptions").mockReturnValue({
            from: "/some/path",
            marker: "marker",
            includeFrom: false,
            force: true,
        });

        // Act
        const result = closesdir("/some/path", "marker");

        // Assert
        expect(result).toBe("FAKE_RESULT");
    });
});
