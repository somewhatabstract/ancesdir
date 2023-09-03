import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import {terser} from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

export default {
    input: "./src/index.ts",
    output: [
        {
            file: "./dist/index.js",
            format: "cjs",
            sourcemap: true,
            exports: "auto",
        },
        {
            file: "./dist/es/index.js",
            format: "esm",
            sourcemap: true,
            exports: "auto",
        },
    ],
    plugins: [
        babel({
            configFile: "./babel.config.js",
            exclude: "node_modules/**", // only transpile our source code
            babelHelpers: "bundled",
            extensions: [".ts"],
        }),
        resolve({preferBuiltins: true, extensions: [".ts"]}),
        commonjs(),
        terser(),
        filesize(),
    ],
};
