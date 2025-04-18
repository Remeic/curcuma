export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [2, "always", 100],
    "type-enum": [2, "always", ["feat", "fix", "chore", "refactor"]],
    "scope-enum": [2, "always", ["store", "general", "ui", "db"]],
  },
};
