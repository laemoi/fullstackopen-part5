module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',                  // Airbnb base rules for JS + React
    'airbnb/hooks',            // Airbnb's React hooks best practices
    'plugin:react/recommended',// Additional recommended React rules
    'plugin:jsx-a11y/recommended', // Accessibility for JSX
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/react',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,              // Enable JSX parsing
    },
  },
  plugins: [
    'react',                  // React-specific linting
    'react-hooks',            // For rules of hooks
    'jsx-a11y',               // Accessibility checks
    'import',                 // Ensures consistent import/export
  ],
  rules: {
    // Example overrides
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'semi': ['error', 'never'], // Enable this in future projects
    'react/jsx-one-expression-per-line': 'off',
    'react/function-component-definition': [2, { 'namedComponents': 'arrow-function' }],
    'react/prop-types': 'off',
    'comma-dangle': ['error', 'never'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-indent': [2, 2],
    'eol-last': 'off', // In future, turn on
    'react/jsx-wrap-multilines': [2, { 'return': 'parens-new-line', 'arrow': 'parens-new-line' }],
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'warn',
    'brace-style': [2, 'stroustrup'],
    'arrow-parens': [2, 'as-needed', { 'requireForBlockBody': true }],
    'no-trailing-spaces': [2, { 'skipBlankLines': true }],
    'react/jsx-curly-brace-presence': 'off',
    'operator-linebreak': 'off',
    'react/jsx-curly-newline': 'off',
    'no-alert': 'off',
    'object-curly-newline': [2, { 'ObjectPattern': 'never' }],
    'max-len': 'off',
    'no-return-assign': 'off',
    'react/forbid-prop-types': 'off'
  },
  settings: {
    react: {
      version: 'detect',      // Automatically detects the React version
    },
  },
};