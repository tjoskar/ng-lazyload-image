const path = require('path');
const webpack = require('webpack');
const devWebpackConfig = require('./webpack.config');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = Object.assign({}, devWebpackConfig, {
    devtool: 'source-map',
    cache: false,

    devServer: undefined,
    output: {
        path: path.resolve(__dirname, './example-dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
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
            ENV: JSON.stringify(ENV)
        })
    ]
});
