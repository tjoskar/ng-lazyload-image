const path = require('path');
const webpack = require('webpack');
const devWebpackConfig = require('./webpack.config');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = Object.assign({}, devWebpackConfig, {
    devtool: 'source-map',
    cache: false,
    mode: ENV,

    devServer: undefined,
    output: {
        path: path.resolve(__dirname, './example-dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(ENV)
        })
    ]
});
