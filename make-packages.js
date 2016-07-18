const pkg     = require('./package.json');
const path    = require('path');
const Builder = require('systemjs-builder');
const name    = pkg.name;

const builder = new Builder();
const config = {
    baseURL: '.',
    transpiler: 'typescript',
    typescriptOptions: {
        module: 'cjs'
    },
    map: {
        typescript: './node_modules/typescript/lib/typescript.js',
        '@angular': path.resolve('node_modules/@angular'),
        rxjs: path.resolve('node_modules/rxjs')
    },
    paths: {
        '*': '*.js'
    },
    meta: {
        'node_modules/@angular/*': { build: false },
        'node_modules/rxjs/*': { build: false }
    }
};

builder.config(config);

builder
    .bundle('index', path.resolve(__dirname, 'bundles/', name + '.js'))
    .then(() => console.log('Build complete.'))
    .catch(err => console.log('Error: ', err));
