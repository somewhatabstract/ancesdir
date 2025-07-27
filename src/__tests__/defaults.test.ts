import path from "node:path";
import {defaultFrom} from "../defaults";
import * as FindMarker from "../find-marker";

jest.mock("../find-marker");

describe("defaultFrom", () => {
    it("should find the root folder of the ancesdir module", () => {
        // Arrange
        const findMarkerSpy = jest.spyOn(FindMarker, "findMarker");

        // Act
        defaultFrom();

        // Assert
        expect(findMarkerSpy).toHaveBeenCalledWith({
            force: false,
            from: path.dirname(__dirname),
            marker: "package.json",
            includeFrom: false,
        });
    });

    it("should return the path to the ancesdir module's parent directory", () => {
        // Arrange
        jest.spyOn(FindMarker, "findMarker").mockReturnValue("PATH_TO_PARENT");

        // Act
        const result = defaultFrom();

        // Assert
        expect(result).toBe("PATH_TO_PARENT");
    });
});
