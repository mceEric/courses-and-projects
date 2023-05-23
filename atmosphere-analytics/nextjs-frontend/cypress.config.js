const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);

      on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));
      return config;
    },
    baseUrl: "http://localhost:3000",
  },
  env: {
    username: "eric@mail.com",
    password: "Qwert123!",
    codeCoverage: {
      exclude: ["Settings.jsx", "services/*.js"],
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
