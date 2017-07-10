"use strict";

const webpack = require("webpack");

const defaultConfig = require("./webpack.config");
const prodConfig = Object.assign({}, defaultConfig);

// remove sourcemaps
prodConfig.devtool = null;
prodConfig.module.preLoaders = prodConfig.module.preLoaders.filter((preloader) => {
    return preloader.loader !== "source-map-loader";
});

prodConfig.plugins.push(
    // bundle React in prod mode
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": "\"production\"",
        },
    }),
    // same as --optimize-dedupe in CLI
    new webpack.optimize.DedupePlugin(),
    // same as --optimize-minimize in CLI
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
    })
);

module.exports = prodConfig;
