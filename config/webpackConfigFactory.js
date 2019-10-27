const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// const autoprefixer = require("autoprefixer");
// const webpack = require("webpack");
// const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// const eslintFormatter = require("react-dev-utils/eslintFormatter");
// const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
// const { ReactLoadablePlugin } = require("react-loadable/webpack");
// const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ManifestPlugin = require("webpack-manifest-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// const { getAppEnv } = require("./env");

// const env = getAppEnv();
// const { PUBLIC_URL = "" } = env.raw;

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

/**
 * This function generates a webpack config object for the client-side bundle.
 */
module.exports = function(envType) {
  const IS_DEV = envType === "development";
  const IS_PROD = envType === "production";
  const config = {};

  config.mode = envType;

  config.devtool = IS_DEV
    ? "cheap-module-eval-source-map"
    : "cheap-module-source-map";

  config.entry = resolvePath("../src/index.js");

  config.output = IS_DEV
    ? {
        path: resolvePath("../dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
      }
    : {
        path: resolvePath("../dist"),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js"
      };

  config.module = {
    rules: [
      // Babel
      {
        test: /\.js$/,
        include: resolvePath("../src"),
        loader: "babel-loader"
      },

      // SCSS Modules
      {
        test: /\.scss$/,
        use: [
          IS_DEV && "style-loader",
          IS_PROD && MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          "postcss-loader",
          "sass-loader"
        ].filter(Boolean)
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          IS_PROD && MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ].filter(Boolean)
      },
      {
        test: /\.(jpe?g|png|gif)/,
        use: {
          loader: "url-loader",
          options: {
            filename: "[name].[hash].[ext]",
            limit: 8000
          }
        }
      }
    ].filter(Boolean)
  };

  config.optimization = {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  };

  config.plugins = [
    // new webpack.DefinePlugin(env.forWebpackDefinePlugin),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new LodashModuleReplacementPlugin(),
    // IS_DEV && new webpack.HotModuleReplacementPlugin(),
    // IS_DEV && new CaseSensitivePathsPlugin(),
    // IS_DEV && new ErrorOverlayPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: resolvePath("../public/template.html")
    })
    // IS_PROD &&
    //   new ManifestPlugin({
    //     fileName: "asset-manifest.json"
    //   }),
    // new ReactLoadablePlugin({
    //   filename: "build/react-loadable.json"
    // })
  ].filter(Boolean);

  return config;
};
