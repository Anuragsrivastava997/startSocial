module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "google",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["unicorn", "sonarjs", "import"],
  rules: {},
};
