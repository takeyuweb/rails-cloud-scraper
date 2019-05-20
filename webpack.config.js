const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const dist = path.resolve(__dirname, "public/javascripts/dist");

  return {
    entry: {
      javascripts: "./app/frontend/javascripts/main.ts",
      styles: "./app/frontend/styles/main.scss",
    },

    output: {
      filename: "[name].[contenthash].js",
      path: dist,
      publicPath: "dist/"
    },

    mode: isProduction ? "production" : "development",

    devtool: isProduction ? "source-map" : "inline-source-map",

    resolve: {
      extensions: [".css", ".ts", ".tsx", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }]
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader" }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new ManifestPlugin({ fileName: "webpack-manifest.json" }),
      !isProduction && new LiveReloadPlugin({ appendScriptTag: true })
    ].filter(Boolean)
  };
};
