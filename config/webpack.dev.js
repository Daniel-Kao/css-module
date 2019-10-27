const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: resolvePath('../src/index.js'),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: resolvePath('../dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: resolvePath('../src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            filename: '[name].[ext]',
            limit: 8000,
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: '../build',
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('../public/template.html'),
    }),
  ],
};
