const [clientConfig] = require("./packages/client/eslint.config");
const [serverConfig] = require("./packages/server/eslint.config");

module.exports = [
  {
    ...clientConfig,
    files: ["packages/client/**/*.js"],
  },
  {
    ...serverConfig,
    files: ["eslint.config.js", "packages/server/**/*.js"],
  },
];
