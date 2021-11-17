module.exports = {
    extends: [
        'airbnb',
        'prettier',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            impliedStrict: true,
            classes: true
        }
    },
    env: {
        browser: true,

        node: true,
        jquery: true,
        jest: true
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx']
            }
        }
    },
    rules: {
        'import/prefer-default-export': 'off',
        'import/extensions': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.{js,jsx}'] }],
        'comma-dangle': ['error', 'never'],
        'react/destructuring-assignment': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-indent': 'off',
        'import/no-named-as-default': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
        'no-use-before-define': 'off',
        'react/jsx-props-no-spreading': 'off',
        'arrow-body-style': 'off',
        'no-confusing-arrow': 'off',
        'react/jsx-indent-props': 'off',
        'no-trailing-spaces': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-autofocus': 'off',
        'no-shadow': 'off',
        'no-param-reassign': 'off',
        'lines-between-class-members': 'off',
        'no-nested-ternary': 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-no-bind': 'off',
        'global-require': 'off',
        'no-continue': 'off',
        'no-unused-vars': 'warn',
        'no-tabs': 0,
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'none',
                singleQuote: true,
                printWidth: 100,
                tabWidth: 4,
                bracketSpacing: true
            }
        ],
        camelcase: 'off',
        indent: 'off'
    },
    plugins: ['prettier', 'react']
};
