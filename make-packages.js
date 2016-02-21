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
        angular2: path.resolve('node_modules/angular2'),
        rxjs: path.resolve('node_modules/rxjs')
    },
    paths: {
        '*': '*.js'
    },
    meta: {
        'node_modules/angular2/*': { build: false },
        'node_modules/rxjs/*': { build: false }
    }
};

builder.config(config);

builder
    .bundle(name, path.resolve(__dirname, 'bundles/', name + '.js'))
    .then(() => console.log('Build complete.'))
    .catch(err => console.log('Error: ', err));
