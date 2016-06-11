import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

bootstrap(AppComponent);

function main() {
    return bootstrap(AppComponent)
    .then(() => '🦄')
    .catch(err => console.error(err));
}

if (ENV === 'development' && HMR === true) {
    // activate hot module reload
    if (document.readyState === 'complete') {
        console.clear();
        main();
    } else {
        document.addEventListener('DOMContentLoaded', main);
    }
    module.hot.accept();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
