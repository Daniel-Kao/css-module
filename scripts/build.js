/* eslint-disable no-console */
process.env.NODE_ENV = "production";

const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild
} = require("react-dev-utils/FileSizeReporter");

const createConfig = require("../config/webpackConfigFactory.js");
const clientConfig = createConfig("production");

process.on("unhandledRejection", err => {
  throw err;
});

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

measureFileSizesBeforeBuild(resolvePath("../dist"))
  .then(previousFileSizes => {
    fs.emptyDirSync(resolvePath("../dist"));
    return build(previousFileSizes);
  })
  .then(
    result => printResult(result),
    err => {
      console.log(chalk.red("Failed to compile.\n"));
      console.log((err.message || err) + "\n");
      process.exit(1);
    }
  );

function build(previousFileSizes) {
  console.log(chalk.blue("\n\tCreating an optimized production build...\n"));

  const clientCompiler = webpack(clientConfig);

  return new Promise((resolve, reject) => {
    clientCompiler.run((err, stats) => {
      if (err) {
        return reject(err);
      } else {
        console.log(chalk.white("✓ Client webpack build complete"));
      }

      resolve({
        stats,
        previousFileSizes
      });
    });
  });
}

function printResult({ stats, previousFileSizes }) {
  console.log(chalk.green("Compiled successfully.\n"));
  console.log("File sizes after gzip:\n");

  printFileSizesAfterBuild(
    stats,
    previousFileSizes,
    resolvePath("../dist"),
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE
  );
  console.log();
}
