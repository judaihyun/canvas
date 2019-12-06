module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
      "indent": [
          2,
          "tab"
      ],
      "semi": [
          "error",
          "always"
	  ],
	  "one-var":[2,
		{
		  "var": "never"
		}
	  ],
	  "func-names": ["error", "never"],
	  "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
	  "prefer-arrow-callback": [ "error", { "allowNamedFunctions": false} ],
      "no-tabs":0,
      "no-console":"off",
      "linebreak-style":0,
      "no-trailing-spaces": 0,
      "keyword-spacing": 0,
      "no-unused-vars": 1,
      "space-before-function-paren": 0,
	  "eol-last": 0,
	  "consistent-return": ["error", { "treatUndefinedAsUnspecified": false }],
	  "padded-blocks": ["error", { "blocks": "never" }],
  }
};
