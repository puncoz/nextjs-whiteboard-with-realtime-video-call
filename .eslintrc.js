module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:eslint-comments/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "simple-import-sort",
    "react-refresh",
    "react",
  ],
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-alert": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: [
      "error", 2, {
        ignoredNodes: [
          "JSXAttribute",
        ],
      }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    semi: ["error", "never"],
    "no-unused-vars": [
      "error", {
        argsIgnorePattern: "^_",
      }],
    "no-multi-spaces": [
      2, {
        exceptions: {
          ExportNamedDeclaration: true,
          ImportDeclaration: true,
        },
      }],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-function-paren": [
      "error", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    camelcase: ["error"],
    "no-duplicate-imports": ["error"],
    "@typescript-eslint/ban-ts-comment": ["error"],
    "@typescript-eslint/no-explicit-any": ["error"],
    "@typescript-eslint/no-empty-function": ["error"],
    "simple-import-sort/imports": ["error"],
    "simple-import-sort/exports": ["error"],
    "react/jsx-max-props-per-line": [
      "error", {
        maximum: {
          single: 4,
          multi: 1,
        },
      },
    ],
    "react/jsx-indent-props": ["error", "first"],
    "react/jsx-tag-spacing": [
      "error", {
        closingSlash: "never",
        beforeSelfClosing: "never",
        afterOpening: "never",
        beforeClosing: "never",
      },
    ],
    "react/jsx-closing-bracket-location": ["error", "after-props"],
    "react/jsx-closing-tag-location": ["error"],
    "react/jsx-first-prop-new-line": ["error", "never"],
    "react/function-component-definition": [
      "error", {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react-refresh/only-export-components": [
      "warn", {
        allowConstantExport: true,
        allowExportNames: ["metadata"],
      },
    ],
  },
}
