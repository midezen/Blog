const webpack = require("webpack");

module.exports = function override(config, env) {
  config.plugins.push(
    new webpack.ProvidePlugin({
      "html-to-text": "html-to-text",
    })
  );
  return config;
};
