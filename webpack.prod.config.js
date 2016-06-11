const path = require('path');
const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const devWebpackConfig = require('./webpack.config');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HMR = false;

module.exports = Object.assign({}, devWebpackConfig, {
    devtool: 'source-map',
    debug: false,
    cache: false,

    devServer: undefined,

    plugins: [
        new ForkCheckerPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8 : true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        new webpack.DefinePlugin({
            HMR,
            ENV: JSON.stringify(ENV)
        })
    ]
});
