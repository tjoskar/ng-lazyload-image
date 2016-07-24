## ng2-lazyload-image

> Lazy image loader for Angular 2

[![Build Status](https://travis-ci.org/tjoskar/ng2-lazyload-image.svg?branch=master)](https://travis-ci.org/tjoskar/ng2-lazyload-image)

About [90 loc](https://github.com/tjoskar/ng2-lazyload-image/blob/master/src/lazyload-image.directive.ts) and no dependencies (except for angular and rxjs of course)

Demo: http://tjoskar.github.io/ng2-lazyload-image/

### Installation
```
$ npm install ng2-lazyload-image --save
```

### Usages

```javascript
import { Component } from '@angular/core';
import { LazyLoadImageDirective } from 'ng2-lazyload-image';

@Component({
    selector: 'image',
    template: `
        <img [src]="defaultImage" [lazyLoad]="image" [offset]="offset">
    `,
    directives: [ LazyLoadImageDirective ]
})
class ImageComponent {
    defaultImage = 'https://www.placecage.com/1000/1000';
    image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
    offset = 100;
}
```

It also supports background images, by using `backgroundImage`:

```javascript
@Component({
    selector: 'image',
    template: `
        <div [src]="defaultImage" [lazyLoad]="image" [offset]="offset"></div>
        <!--
        After it has been loaded the div will transform into:
        <div class="ng2-lazyloaded" style="background-image: url('https://images.unsplash.com/photo-1431887773042-803ed52bed26?fm=jpg');"></div>
        -->
    `,
    directives: [ LazyLoadImageDirective ]
})
class ImageComponent {
    defaultImage = 'https://www.placecage.com/1000/1000';
    image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
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
