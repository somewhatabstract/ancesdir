import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import {terser} from "rollup-plugin-terser";
import analyzer from "rollup-plugin-analyzer";
import visualizer from "rollup-plugin-visualizer";

const getOptionalPlugins = () => {
    if (process.env.NODE_ENV === "CI") {
        // We don't need any of these when running on CI.
        return [];
    }

    return [
        // NOTE: The analysis is of the pre-minified output.
        // So the reported bundle size is the non-minified size that includes
        // comments and full code.
        analyzer({summaryOnly: true, filter: (module) => module.size !== 0}),
        visualizer({
            title: "ancesdir bundle rollup (minified)",
            filename: "obj/stats.html",
        }),
    ];
};

export default {
    input: "./src/index.js",
    output: {
        file: "./dist/index.js",
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        resolve({preferBuiltins: true}),
        babel({
            exclude: "node_modules/**", // only transpile our source code
            babelHelpers: "bundled",
        }),
        commonjs(),
        terser(),
        ...getOptionalPlugins(),
    ],
};
