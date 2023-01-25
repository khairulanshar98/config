const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const path = require("path");

module.exports = {
  entry: {
    init: "./src/init.ts",
  },
  mode: "development",
  devtool: false,
  output: {
    filename: "init.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "single",
      filename: "remoteEntry.js",
      exposes: {
        "./spa": "./src/init.ts",
      },
    }),
  ],
};
