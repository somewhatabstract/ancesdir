import {normalizeOptions} from "../normalize-options";
import * as Defaults from "../defaults";

describe("normalizeOptions", () => {
    beforeEach(() => {
        // Override this just so we're not running the real implementation.
        jest.spyOn(Defaults, "defaultFrom").mockReturnValue("");
    });

    it.each`
        args
        ${[]}
        ${[undefined, "custom-marker"]}
        ${[{marker: "custom-marker"}]}
    `(
        "should default from to the defaultFrom result when called with $args",
        ({args}) => {
            // Arrange
            jest.spyOn(Defaults, "defaultFrom").mockReturnValue(
                "/ancesdir/root",
            );

            // Act
            const options = normalizeOptions(...args);

            // Assert
            expect(options.from).toBe("/ancesdir/root");
        },
    );

    it.each`
        args
        ${["/ancesdir/root"]}
        ${[
    {
        from: "/ancesdir/root",
    },
]}
    `(
        "should default marker to the defaultMarker result when called with $args",
        ({args}) => {
            // Arrange

            // Act
            const options = normalizeOptions(...args);

            // Assert
            expect(options.marker).toBe(Defaults.defaultMarker);
        },
    );

    it.each`
        args
        ${["/ancesdir/root"]}
        ${[
    {
        from: "/ancesdir/root",
    },
]}
    `(
        "should default includeFrom to false when called with $args",
        ({args}) => {
            // Arrange

            // Act
            const options = normalizeOptions(...args);

            // Assert
            expect(options.includeFrom).toBe(false);
        },
    );

    it("should not modify options that are passed in", () => {
        // Arrange
        const options = {
            from: "/ancesdir/root",
            marker: "custom-marker",
            includeFrom: true,
        };

        // Act
        const normalized = normalizeOptions(options);

        // Assert
        expect(normalized).toStrictEqual(options);
    });
});
