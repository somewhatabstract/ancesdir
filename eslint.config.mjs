import eslintComments from "eslint-plugin-eslint-comments";
import _import from "eslint-plugin-import";
import jest from "eslint-plugin-jest";
import babel from "@babel/eslint-plugin";
import {fixupPluginRules} from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/node_modules", "**/coverage", "**/dist"],
    },
    ...compat.extends("@khanacademy"),
    {
        plugins: {
            "eslint-comments": eslintComments,
            import: fixupPluginRules(_import),
            jest,
            "@babel": babel,
        },

        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.node,
            },
        },

        rules: {
            "constructor-super": "error",
            curly: "error",
            eqeqeq: ["error", "allow-null"],
            "generator-star-spacing": "error",
            "guard-for-in": "error",
            "linebreak-style": ["error", "unix"],
            "no-alert": "error",
            "no-array-constructor": "error",
            "no-console": "error",
            "no-debugger": "error",
            "no-dupe-class-members": "error",
            "no-dupe-keys": "error",
            "no-extra-bind": "error",
            "no-new": "error",
            "no-new-func": "error",
            "no-new-object": "error",
            "no-throw-literal": "error",
            "@babel/no-invalid-this": "error",
            "no-with": "error",
            "no-async-promise-executor": "error",
            "no-const-assign": "error",

            "no-else-return": [
                "error",
                {
                    allowElseIf: false,
                },
            ],

            "no-irregular-whitespace": "off",
            "no-multi-str": "error",
            "no-prototype-builtins": "off",

            "no-restricted-syntax": [
                "error",
                {
                    selector: "IntersectionTypeAnnotation",
                    message:
                        "Use exact object types and the spread operator instead",
                },
            ],

            "no-return-await": "error",
            "no-this-before-super": "error",
            "no-useless-catch": "off",
            "no-useless-call": "error",
            "no-undef": "error",
            "no-unexpected-multiline": "error",
            "no-unreachable": "error",
            "no-unused-expressions": "error",

            "no-unused-vars": [
                "error",
                {
                    args: "none",
                    varsIgnorePattern: "^_*$",
                },
            ],

            "no-var": "error",
            "one-var": ["error", "never"],
            "prefer-const": "error",
            "prefer-spread": "error",
            "require-await": "error",
            "require-yield": "error",
            "prefer-template": "off",
            "arrow-parens": "off",
            "prefer-arrow-callback": "off",
            "no-case-declarations": "off",
            "valid-jsdoc": "off",
            "require-jsdoc": "off",
            "eslint-comments/no-unlimited-disable": "error",
            "eslint-comments/no-unused-disable": "error",

            "import/extensions": [
                "error",
                "never",
                {
                    ignorePackages: true,
                },
            ],

            "import/no-cycle": [
                "error",
                {
                    ignoreExternal: true,
                    commonjs: true,
                    maxDepth: 6,
                },
            ],

            "import/named": "error",
            "import/default": "error",
            "import/namespace": "error",

            "import/no-unassigned-import": [
                "error",
                {
                    allow: ["@jest/globals", "jest-extended"],
                },
            ],

            "jest/no-focused-tests": "error",
            "jest/no-identical-title": "error",
            "jest/prefer-to-contain": "error",
            "jest/prefer-to-have-length": "error",
            "jest/valid-title": "error",

            "prettier/prettier": [
                "error",
                {
                    tabWidth: 4,
                    trailingComma: "all",
                    bracketSpacing: false,
                },
            ],
        },
    },
];
