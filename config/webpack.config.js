"use strict";

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const WebpackNotifierPlugin = require("webpack-notifier");

const staticFileRegex = /\.(woff|svg|ttf|eot|gif|jpeg|jpg|png)([\?]?.*)$/;
const autoprefixerConfig = {
    browsers: [
        "> 1%",
        "last 2 versions",
        "Firefox ESR",
        "Opera 12.1",
    ],
};

module.exports = {
    entry: {
        bundle: [
            path.join(__dirname, "../build/src/app.js"),
            path.join(__dirname, "../build/src/app.scss"),
        ]
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "..", "build", "src"),
    },
    devtool: "cheap-module-inline-source-map",
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                enforce: "pre",
                test: /\.css$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: ["css?sourceMap", "postcss"]
                }),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        "css?sourceMap",
                        "postcss",
                        "resolve-url",
                        // when used with UglifyJS, sass-loader uses outputStyle "compressed",
                        // which breaks resolve-url-loader
                        "sass?sourceMap&outputStyle=nested",
                    ]
                }),
            },
            {
                test: staticFileRegex,
                include: [
                    path.resolve(__dirname, "../node_modules"),
                ],
                loader: "file-loader",
                query: {
                    name: "[path][name].[ext]",
                },
            },
            {
                test: /\.json$/,
                loader: "json",
            },
        ],
    },
    plugins: [
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
        }),
        new ExtractTextPlugin('[name]/app.css'),
        new WebpackNotifierPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer(autoprefixerConfig),
                ]
            }
        })
    ],
};
