const path = require('path');
const webpack = require('webpack');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = {
    devtool: 'source-map',
    cache: true,
    mode: ENV,

    entry: {
        'polyfills': './example/polyfills.ts',
        'main': './example/boot.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        path: path.resolve(__dirname, './example'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    path.resolve(__dirname, 'node_modules/rxjs'),
                    path.resolve(__dirname, 'node_modules/@angular')
                ]
            },
            { test: /\.ts$/, loader: 'awesome-typescript-loader' },

            // Support for CSS as raw text
            { test: /\.css$/, loader: 'raw-loader' },

            { test: /\.scss$/, loaders: ["style", "css", "sass"] },

            // support for .html as raw text
            { test: /\.html$/, loader: 'raw-loader', exclude: path.resolve(__dirname, 'src/index.html') }
        ],
    },

    devServer: {
        port: 9000,
        host: 'localhost',
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'example'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(ENV)
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
            path.resolve(__dirname, 'src')
        )
    ]
};
