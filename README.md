## ng2-lazyload-image

> Lazy image loader for Angular 2

[![Build Status](https://travis-ci.org/tjoskar/ng2-lazyload-image.svg?branch=master)](https://travis-ci.org/tjoskar/ng2-lazyload-image) [![npm version](https://badge.fury.io/js/ng2-lazyload-image.svg)](https://badge.fury.io/js/ng2-lazyload-image)
[![npm](https://img.shields.io/npm/l/ng2-lazyload-image.svg?maxAge=2592000)]()

[![Build Status](https://saucelabs.com/browser-matrix/tjoskar.svg)](https://saucelabs.com/beta/builds/c7a7d7683d6843f79ae4118f737769c5)

About 150 loc and no dependencies (except for angular and rxjs of course)

Demo: http://tjoskar.github.io/ng2-lazyload-image/

### Requirement
The browser you targeting need to have support of `WeakMap`. If you need to support an older browser (like IE or Safari) you will need to include polyfill for `WeakMap` (see https://github.com/zloirock/core-js for example).

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
        <img [defaultImage]="defaultImage" [lazyLoad]="image" [offset]="offset">
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
        <div [defaultImage]="defaultImage" [lazyLoad]="image" [offset]="offset"></div>
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

If you are using Ionic 2 you may need to include your own scroll observable or change the scroll target.

```javascript
@Component({
    selector: 'page-image',
    template: `
      <ion-content #container padding>
        <img [defaultImage]="https://www.placecage.com/1000/1000" [lazyLoad]="lazyLoadImage" [scrollObservable]="container.ionScroll" />
      </ion-content>
    `
})
export class AboutPage {
    lazyLoadImage = 'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5';
}
```

See example folder for more usages.

### API

##### lazyLoad

Type: `string`

Example: `https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg`

The image to be lazy loaded. This image will replace the default image (`defaultImage`).

##### defaultImage (optional)

Type: `string`

Example: `https://www.placecage.com/1000/1000`

Path to default image. This image will be loaded right away.

You can also use `src` attribute for img tag to define default image:  
`<img src="https://www.placecage.com/1000/1000" [lazyLoad]="lazyLoadImage" />`

or `background-image` property for non-image tags:  
`<div style="background-image: url('https://www.placecage.com/1000/1000');" [lazyLoad]="lazyLoadImage"></div>`


##### errorImage (optional)

Type: `string`

Example: `https://i.imgur.com/XkU4Ajf.png`

An image to be loaded if failing to load `lazyLoad`. Will load the default image (`defaultImage`) if absent.

##### offset (optional)

Type: `number`

Example: `100`

Default: `0`

Number of px a image should be loaded before it is in view port

##### scrollTarget (optional)

Type: `Element`

Example: `document.getElementById('my-scroll-container')`

Default: `window`

You will need to set this property if you are using a scroll container and do not propagate the scroll event to window.

##### scrollObservable (optional)

Type: `Observable`

Example: `Observable.fromEvent(myScrollContainer, 'scroll')`

You can pass your own observable if you need more control over the flow. Can be useful if integrating with other frameworks like ionic.


### Develop
Run `unit` tests:
```
$ npm test
```

Run `e2e` tests:
```
$ npm run webdriver:update
$ npm run e2e
```
