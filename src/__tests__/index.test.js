// @flow
import ancesdir from "../index.js";

describe("ancesdir", () => {
    it("should work", () => {
        console.log(ancesdir());
    });

    it("should cache", () => {
        console.log(ancesdir());
        console.log(ancesdir(__dirname));
    });
});
