import {defineConfig} from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import filesize from "rollup-plugin-filesize";
import {codecovRollupPlugin} from "@codecov/rollup-plugin";

export default defineConfig({
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
        process.env.CODECOV_TOKEN == null
            ? // This plugin outputs size info to the console when local.
              filesize()
            : // This plugin provides bundle analysis from codecov, but does not work
              // locally without the appropriate token (and possible other config).
              codecovRollupPlugin({
                  enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
                  bundleName: "ancesdir",
                  uploadToken: process.env.CODECOV_TOKEN,
              }),
    ],
});
