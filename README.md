## ng2-lazyload-image

> Lazy image loader for Angular 2

[![Build Status](https://travis-ci.org/tjoskar/ng2-lazyload-image.svg?branch=master)](https://travis-ci.org/tjoskar/ng2-lazyload-image) [![npm version](https://badge.fury.io/js/ng2-lazyload-image.svg)](https://badge.fury.io/js/ng2-lazyload-image)
[![npm](https://img.shields.io/npm/l/ng2-lazyload-image.svg?maxAge=2592000)]()

[![Build Status](https://saucelabs.com/browser-matrix/tjoskar.svg)](https://saucelabs.com/beta/builds/c7a7d7683d6843f79ae4118f737769c5)

About [90 loc](https://github.com/tjoskar/ng2-lazyload-image/blob/master/src/lazyload-image.directive.ts) and no dependencies (except for angular and rxjs of course)

Demo: http://tjoskar.github.io/ng2-lazyload-image/

### Requirement
The browser you targeting need to have support of `WeepMap`. If you need to support an older browser (like IE or Safari) you will need to include polyfill for `WeekMap` (see https://github.com/zloirock/core-js for example).

### Installation
```
$ npm install ng2-lazyload-image --save
```

And then include it in your module (see [app.module.ts](https://github.com/tjoskar/ng2-lazyload-image/blob/master/example/app.module.ts)):
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, LazyLoadImageModule ],
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```

### Usages

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'image',
    template: `
        <img [src]="defaultImage" [lazyLoad]="image" [offset]="offset">
    `
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
        <div class="ng2-lazyloaded" style="background-image: url('https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg');"></div>
        -->
    `
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
