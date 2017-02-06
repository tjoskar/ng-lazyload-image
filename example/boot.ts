import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

function main() {
    // JIT compilation
    platformBrowserDynamic().bootstrapModule(AppModule);
}

if (ENV !== 'development') {
    enableProdMode();
}

document.addEventListener('DOMContentLoaded', main);
