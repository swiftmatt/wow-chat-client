module.exports = {
    env: {
        es6: true,
        jest: true,
        'jest/globals': true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:jest/recommended',
        'plugin:jest/style',
    ],
    ignorePatterns: [
        'coverage/*',
        'dist/*',
        'node_modules/*',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: [
            './tsconfig.eslint.json',
            './tsconfig.json',
        ],
    },
    plugins: [
        '@typescript-eslint',
        'jest',
    ],
    root: true,
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        indent: ['error', 4],
    },
};
