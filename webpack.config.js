const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: {
        app: './example/boot.ts',
        vendors: [
            'es6-shim',
            'reflect-metadata',
            'rxjs/Observable',
            'zone.js/dist/zone',
            'zone.js/dist/long-stack-trace-zone',
            'angular2/platform/browser',
            'angular2/core',
        ]
    },
    output: {
        path: './example/',
        filename: 'one-file-to-rule-them-all.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }],
        noParse: [/zone\.js\/dist\/.+/]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    devServer: {
        port: 9000,
        inline: true,
        hot: true,
        historyApiFallback: true,
        contentBase: 'example'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
