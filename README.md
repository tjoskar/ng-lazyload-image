## ng-lazyload-image

> Lazy image loader for Angular ≥ v2

[![Build Status](https://travis-ci.org/tjoskar/ng-lazyload-image.svg?branch=master)](https://travis-ci.org/tjoskar/ng-lazyload-image) [![npm version](https://badge.fury.io/js/ng-lazyload-image.svg)](https://badge.fury.io/js/ng-lazyload-image)
[![npm](https://img.shields.io/npm/l/ng-lazyload-image.svg?maxAge=2592000)]()

[![Build Status](https://saucelabs.com/browser-matrix/tjoskar.svg)](https://saucelabs.com/beta/builds/c7a7d7683d6843f79ae4118f737769c5)

About 150 loc and no dependencies (except for angular and rxjs of course)

Demo: http://tjoskar.github.io/ng-lazyload-image/

### Requirement
The browser you targeting need to have support of `WeakMap` and `String.prototype.includes`. If you need to support an older browser (like IE) you will need to include polyfill for `WeakMap` and `String.prototype.includes` (see https://github.com/zloirock/core-js for example).

### Installation
```
$ npm install ng-lazyload-image --save
```

And then include it in your module (see [app.module.ts](https://github.com/tjoskar/ng-lazyload-image/blob/master/example/app.module.ts)):
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng-lazyload-image';
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
        <div class="ng-lazyloaded" style="background-image: url('https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg');"></div>
        -->
    `
})
class ImageComponent {
    defaultImage = 'https://www.placecage.com/1000/1000';
    image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
    offset = 100;
}
```

If using responsive images in a plain `<img>` tag, you'll need to set the `useSrcset` attribute to `true`:
```javascript
@Component({
    selector: 'image',
    template: `
        <img [defaultImage]="defaultImage"
             [lazyLoad]="images"
             [useSrcset]="true"
             [offset]="offset">
    `
})
class ImageComponent {
    offset = 100;
    defaultImage = 'https://www.placecage.com/1000/1000';
    images = `https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?fm=jpg 700w,
              https://images.unsplash.com/photo-1437818628339-19ded67ade8e?fm=jpg 1100w`;
}
```

If using responsive images in a `<picture>` tag, set the default `<img>` tag as usual with `lazyLoad` etc. attributes.  
You can use `attr.lazyLoad`, `attr.defaultImage` and `attr.errorImage` attributes for `<source>` elements.  
There's no need to set `useSrcset` for `<source>` elements, as `srcset` is used by default.  
A simple example for a `<picture>` tag:
```javascript
@Component({
    selector: 'image',
    template: `
        <picture>
            <source media="(min-width: {{ screen_lg }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image2">
            <source media="(min-width: {{ screen_md }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image3">
            <img [defaultImage]="defaultImage"
                 [lazyLoad]="image1"
                 [offset]="offset">
        </picture>
    `
})
class ImageComponent {
    offset = 100;
    screen_lg = '1200px';
    screen_md = '992px';
    defaultImage = 'https://www.placecage.com/1000/1000';
    image1 = 'https://images.unsplash.com/photo-1422004707501-e8dad229e17a?fm=jpg';
    image2 = 'https://images.unsplash.com/photo-1439931444800-9bcc83f804a6?fm=jpg';
    image3 = 'https://images.unsplash.com/photo-1417128281290-30a42da46277?fm=jpg';
}
```


You can (from 3.3.0) load image async or change the url on the fly, eg.
```html
<img [lazyLoad]="image$ | async">
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

In case of using ion-slides in Ionic 2+, you can include your own scroll observable as below.

```javascript
@Component({
    selector: 'page-image',
    template: `
      <ion-content #container padding>
        <img [defaultImage]="https://www.placecage.com/1000/1000" [lazyLoad]="lazyLoadImage" [scrollObservable]="container.ionSlideWillChange" />
      </ion-content>
    `
})
export class AboutPage {
    lazyLoadImage = 'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5';
}
```

See example folder for more usages.

### FAQ

**Q** How can I manually trigger the loading of images?

**A** See: https://github.com/tjoskar/ng-lazyload-image/issues/197

**Q** Does this library work with ionic or some other wrapper for Angular?

**A** Yes, but ionic and some other library wraps the whole document inside an other div so you might need to create your own scroll listener. https://github.com/tjoskar/ng-lazyload-image/issues?utf8=%E2%9C%93&q=is%3Aissue+Ionic

**Q** How can I add a transition effect between the default image and the lazy loaded image?

**A** See: https://github.com/tjoskar/ng-lazyload-image/issues/300

**Q** I can't get it to work with electron. Can you help me?

**A** Make sure you uses the [right file path](https://github.com/tjoskar/ng-lazyload-image/issues/308#issuecomment-368240550).

**Q** I can't get it to work. Can you help me?

**A** Sure, create an issue and describe your issue in as much detail as possible.

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

##### useSrcset (optional)

Type: `boolean`

Example: `true`

You can set this to `true` if you need to lazy load images with `srcset` attribute, instead of `src`.  
`<source>` tags are set to use `srcset` by default, so you don't need to set this option additionaly.

### Events

##### onLoad (optional)

Type: `Function: (success: boolean) => void`

Example: `<img [lazyLoad]="lazyLoadImage" (onLoad)="myCallbackFunction($event)">`

You can pass a callback function, which will be called when the image is loaded.

### Contributing

See the [contributing guide](CONTRIBUTING.md)
