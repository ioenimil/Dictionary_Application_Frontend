import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  "rules" = {
    "no-console": "warn",
    "quotes": ["error", "double"],
    "semi": "error",
    "no-useless-escape": "error",
    "no-empty": "error",
    "no-self-assign": "error",
    "no-redeclare": "error",
    "no-extra-boolean-cast": "error",
    "getter-return": "error",
    "no-misleading-character-class": "error",
    "no-setter-return": "error",
    "no-unsafe-optional-chaining": "error",
    "no-duplicate-case": "warn",
    "no-debugger": "warn",
    "no-sparse-arrays": "warn",
    "no-fallthrough": "warn",
    "no-cond-assign": "warn",
    "no-constant-condition": "warn",
    "no-unsafe-finally": "warn",
    "no-func-assign": "warn",
    "no-control-regex": "warn",
    "no-prototype-builtins": "warn",
    "no-useless-backreference": "warn",
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-empty-function": "error",
    "require-yield": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "no-undef": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { "prefer": "type-imports" }
    ],
  }
];