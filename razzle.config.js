const ConfigWebpackPlugin = require("config-webpack");

module.exports = {
  modify: (config, { dev, target }, webpack) => {
    config.plugins.push(new ConfigWebpackPlugin());
    config.devtool = dev ? "source-map" : false;
    return config;
  }
};
