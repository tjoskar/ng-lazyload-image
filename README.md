## ng2-lazyload-image

> Lazy image loader for Angular 2

About 90 loc and no dependencies (except for ng2 and rxjs of curse)

Demo: ---

### Installation
```
$ npm install ng2-image-lazy-load --save
```

### Usages

```javascript
import {Component} from 'angular2/core';
import {LazyLoadImageDirective} from 'ng2-image-lazy-load';

@Component({
    selector: 'image',
    template: `
        <img [src]="defaultImage" [lazyLoad]="image" [offset]="offset">
    `,
    directives: [LazyLoadImageDirective]
})
class ImageComponent {
    defaultImage = 'https://www.placecage.com/1000/1000';
    image = '';
    offset = 100;
}
```

See example folder for more usages.

### Develop
Run `e2e` tests:
```
$ npm run webdriver:update
$ npm run e2e
```
