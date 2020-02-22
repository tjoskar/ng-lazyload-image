<h3 align="center">ng-lazyload-image</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  ![npm](https://img.shields.io/npm/dw/ng-lazyload-image.svg)
  [![npm version](https://badge.fury.io/js/ng-lazyload-image.svg)](https://badge.fury.io/js/ng-lazyload-image)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
  ![Build Status](https://github.com/tjoskar/ng-lazyload-image/workflows/Node%20CI/badge.svg)
</div>

<p align="center">
  A super small libary for lazy loading images for Angular apps with zero dependencies
</p>

## 📝 Table of Contents
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Setup](#setup)
- [Usages](#usages)
- [Debug](#debug)
- [Css](#css)
- [Hooks](#hooks)
- [Search Engine Optimization (SEO)](#seo)
- [FAQ](#faq)
- [Contributing](#contributing)

## 🤯 Demo <a name = "demo"></a>

Visit this site: https://naughty-bose-ec1cfc.netlify.com

## ✅ Prerequisites <a name = "prerequisites"></a>

The browser you are targeting need to have support of `WeakMap` and `String.prototype.includes`. If you need to support an older browser (like IE) you will need to include polyfill for `WeakMap` and `String.prototype.includes` (see https://github.com/zloirock/core-js for example).

Make sure to inclue a pollyfill for [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) if you need to target IE: https://github.com/w3c/IntersectionObserver/tree/master/polyfill

## ⬇️ Install <a name = "install"></a>

To install the package, just run:

```
$ npm install ng-lazyload-image
```

or the following if you are using yarn

```
$ yarn add ng-lazyload-image
```

## 🛠 Setup <a name = "setup"></a>

Include the library in your module (see [app.module.ts](https://github.com/tjoskar/ng-lazyload-image/blob/master/example/src/app.module.ts)):

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it
import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, LazyLoadImageModule ], // <-- and include it
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```

### IntersectionObserver

`ng-lazyload-image` is using a intersection observer by default so you don't need to do anything if you want to continue using the intersection observer as event emitter.

### Scroll listener

You can easily swtich from IntersectionObserver to scroll listener by using the `scrollPreset`:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image'; // <-- include scrollPreset
import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
      BrowserModule,
      LazyLoadImageModule.forRoot({
        preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
      })
    ],
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```

See hooks below for more information.

## 🖼 Usages <a name = "usages"></a>

A simple usecase is to use a `img`-tag and give it the image to lazyload to `[lazyLoad]` and an optional default image to `[defaultImage]`. The default image will be shown while the "real" image is getting loaded.

Example:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'image',
  template: `
    <img [defaultImage]="defaultImage" [lazyLoad]="image">
  `
})
class ImageComponent {
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
}
```

### Background images

It also supports background images, by using `backgroundImage`:

```javascript
@Component({
  selector: 'image',
  template: `
    <div [defaultImage]="defaultImage" [lazyLoad]="image"></div>
  `
})
class ImageComponent {
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
}
```

### Responsive images

If using responsive images in a plain `<img>` tag, you'll need to set the `useSrcset` attribute to `true`:
```javascript
@Component({
  selector: 'image',
  template: `
    <img [defaultImage]="defaultImage"
         [lazyLoad]="images"
         [useSrcset]="true">
    `
})
class ImageComponent {
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
      <img [defaultImage]="defaultImage" [lazyLoad]="image1">
    </picture>
    `
})
class ImageComponent {
    screen_lg = '1200px';
    screen_md = '992px';
    defaultImage = 'https://www.placecage.com/1000/1000';
    image1 = 'https://images.unsplash.com/photo-1422004707501-e8dad229e17a?fm=jpg';
    image2 = 'https://images.unsplash.com/photo-1439931444800-9bcc83f804a6?fm=jpg';
    image3 = 'https://images.unsplash.com/photo-1417128281290-30a42da46277?fm=jpg';
}
```

### Loading image path async

You can load image async or change the url on the fly, eg.
```html
<img [lazyLoad]="image$ | async">
```

### Custom observable

Sometimes you want to get more controll over when the we should check if the image is in viewport. `customObservable` let's you create your own observable.

```ts
import { merge, fromEvent } from 'rxjs'

...

constructor() {
  this.scroll$ = merge(
    fromEvent(window, 'scroll'),
    fromEvent(someDivRef, 'scroll')
  );
}
```

```html
<img [customObservable]="scroll$" ... >
```

### Ionic

If you are using Ionic and **don't** want to use IntersectionObserver, you may need to include your own scroll observable or change the scroll target. For instans if you want to have multiple scroll targets:

```javascript
@Component({
  selector: 'page-image',
  template: `
    <ion-content #container padding>
      <img [defaultImage]="https://www.placecage.com/1000/1000" [lazyLoad]="lazyLoadImage" [customObservable]="container.ionScroll" />
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
        <img [defaultImage]="https://www.placecage.com/1000/1000" [lazyLoad]="lazyLoadImage" [customObservable]="container.ionSlideWillChange" />
      </ion-content>
    `
})
export class AboutPage {
    lazyLoadImage = 'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5';
}
```

## 🐛 Debug

In order to get a better understanding of what is happening you can pass `[debug]="true"` which will output some debug information in the web console.

See [onStateChange](#onStateChange) for more information about the diffrent output messages.

## 💅 CSS

The css class name `ng-lazyloading` will automatically be added before the image is loaded and will be removed when the image has been loaded or if the image couldn't be loaded.

The css class name `ng-lazyloaded` will be added when the image is loaded (regardless of if the image could be loaded or not).

The css class name `ng-failed-lazyloaded` will be added when the image couldn't be loaded.

## 🔄 API

##### lazyLoad

Type: `string`

Example: `https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg`

The image to be lazy loaded. This image will replace the default image (`defaultImage`).

```html
<img [defaultImage]="'https://www.placecage.com/1000/1000'" [lazyLoad]="'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5'">
```

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

```html
<img [defaultImage]="someDefaultImage" [lazyLoad]="imageToLazyLoad" [errorImage]="imageToShowOnError">
```

##### offset (optional)

Type: `number`

Example: `100`

Default: `0`

Number of px a image should be loaded before it is in view port

```html
<img [defaultImage]="someDefaultImage" [lazyLoad]="imageToLazyLoad" offset="100">
```

##### scrollTarget (optional)

Type: `Element`

Example: `document.getElementById('my-scroll-container')`

Default: `window`

You will need to set this property if you are using a scroll container and do not propagate the scroll event to window.

##### customObservable (optional)

Type: `Observable`

Example: `Observable.fromEvent(myScrollContainer, 'scroll')`

You can pass your own observable if you need more control over the flow. Can be useful if integrating with other frameworks like ionic.

##### useSrcset (optional)

Type: `boolean`

Example: `true`

You can set this to `true` if you need to lazy load images with `srcset` attribute, instead of `src`.  
`<source>` tags are set to use `srcset` by default, so you don't need to set this option additionaly.

##### decode (optional)

Type: `boolean`

Example: `true`

You can set this to `true`, the image well be [decoded](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode) before inserted into the DOM. This can be useful for large images.

##### debug (optional)

type: `boolean`

Exaple: `true`

See [debug](#debug) for more information.

### Events

##### onLoad (optional) deprecated

This is deprecated, use `onStateChange` instead.

Type: `Function: (success: boolean) => void`

Example: `<img [lazyLoad]="lazyLoadImage" (onLoad)="myCallbackFunction($event)">`

You can pass a callback function, which will be called when the image is loaded.

##### onStateChange (optional) <a name = "onStateChange"></a>

Type: `Function: (event: StateChange) => void`

Example: `<img [lazyLoad]="lazyLoadImage" (onStateChange)="myCallbackFunction($event)">`

You can pass a callback function, which will be called when the image is getting into different state.

```ts
myCallbackFunction(event: StateChange) {
  switch (event.reason) {
    case 'setup':
      // The lib has been instantiated but we have not done anything yet.
      break;
    case 'observer-emit':
      // The image observer (intersection/scroll observer) has emit a value so we
      // should check if the image is in the viewport.
      // `event.data` is the event in this case.
      break;
    case 'start-loading':
      // The image is in the viewport so the image will start loading
      break;
    case 'mount-image':
      // The image has been loaded successfully so lets put it into the DOM
      break;
    case 'loading-succeeded':
      // The image has successfully been loaded and placed into the DOM
      break;
    case 'loading-failed':
      // The image could not be loaded for some reason.
      // `event.data` is the error in this case
      break;
    case 'finally':
      // The last event before cleaning up
      break;
  }
}
```

## 🎣 Hooks <a name = "hooks"></a>

It is possible to hook into the loading process by create your own functions.

For example, let's say you want to fetch an image with some custom headers. If so, you can create a custom hook to fetch the image:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule, intersectionObserverPreset, LoadImageProps } from 'ng-lazyload-image';
import { AppComponent } from './app.component';

function loadImage({ imagePath }: LoadImageProps): Promise<string> {
  return await fetch(imagePath, {
    headers: {
      Authorization: 'Bearer ...'
    }
  }).then(res => res.blob()).then(blob => URL.createObjectURL(blob));
}

@NgModule({
    declarations: [ AppComponent ],
    imports: [
      BrowserModule,
      LazyLoadImageModule.forRoot({ loadImage })
    ],
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```

The following hooks are supported:

### getObservable

Should return an observable that emits a new value every time `ng-lazyload-image` should check if the image is in viewport.

Eg.

```ts
import { Attributes } from 'ng-lazyload-image';

// This will trigger an event every second
function getObservable(attributes: Attributes) {
  return interval(1000);
}
```

See [intersection-listener.ts](https://github.com/tjoskar/ng-lazyload-image/blob/master/src/intersection-observer-preset/intersection-listener.ts#L19) for example.

### isVisible

Function to check if the element is vissible.

Eg.
```ts
import { IsVisibleProps } from 'ng-lazyload-image';

function isVisible({ event, element, scrollContainer, offset }: IsVisibleProps<SomeEvent>) {
  // `event` is form `getObservable`
  return isElementInViewport(element, scrollContainer, offset);
}
```

### loadImage

Function to load the image. It must return a path to the image (it can however be async, like the example below and/or return a observable).

```ts
import { LoadImageProps } from 'ng-lazyload-image';

function loadImage({ imagePath }: LoadImageProps) {
  return await fetch(imagePath, {
    headers: {
      Authorization: 'Bearer ...'
    }
  }).then(res => res.blob()).then(blob => URL.createObjectURL(blob));
}
```

If you don't want to load the image but instead let the browser load it for you, then you can just return the imagePath (We will however not know if the image can't be loaded and the error image will not be used):

```ts
function loadImage({ imagePath }: LoadImageProps) {
  return [ imagePath ];
}
```

### setLoadedImage

A function to set the image url to the DOM.

Eg.

```ts
import { SetLoadedImageProps } from 'ng-lazyload-image';

function setLoadedImage({ element, imagePath, useSrcset }: SetLoadedImageProps) {
  // `imagePath` comes from `loadImage`
  element.src = imagePath;
}
```

### setErrorImage

This function will be called if the lazy image cant be loaded.

Eg.

```ts
import { SetErrorImageProps } from 'ng-lazyload-image';

function setErrorImage({ element, errorImagePath, useSrcset }: SetErrorImageProps) {
  element.src = errorImagePath;
}
```

### setup

This function will be called on setup. Can be useful for (re)setting css-classes and setting the default image.

This function will be called every time an attrebute is changing.

Eg.

```ts
import { Attributes } from 'ng-lazyload-image';

function setup(atter: Attributes) {
  // Do something
}
```

### finally

This function will be called on teardown. Can be useful for setting css-classes.

Eg.

```ts
import { Attributes } from 'ng-lazyload-image';

function finally(atter: Attributes) {
  // Do something
}
```

### isBot

A function to check if the current user is a bot or not. Can be useful for SSR and SEO.

Default function:
```ts
export const isBot: IsBotFn = navigator => {
  if (navigator && navigator.userAgent) {
    return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(
      navigator.userAgent
    );
  }
  return false;
};
```

You could also force all images to load under SSR by providing such a function to LazyLoadImageModule.forRoot:
```ts
export function isBot(navigator, platformId) {
  return isPlatformServer(platformId) ? true : intersectionObserverPreset.isBot(navigator, platformId);
}
```

### preset

Preset can be useful when you want to set multible of the functions above.

eg.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
      BrowserModule,
      LazyLoadImageModule.forRoot({
        preset: scrollPreset
      })
    ],
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```

If you want to use the `scrollPreset` but overwride on of the functions, you can easily do that:

```ts
LazyLoadImageModule.forRoot({
  preset: scrollPreset,
  finally: ({ element }) => console.log('The image is loaded', element)
})
```

## 🔎 Search Engine Optimization (SEO) <a name = "seo"></a>

`ng-lazyload-image` are using the following strategy:

### Server side rendering (SSR)

- If the user is a bot (see `isBot` hook above), render all the images right away. (useful if the bot don't understand javascript)
- If the user is not a bot (or if we can't decide), don't do anything and let the client fix the images (see below)

### Client side

- If the user is a bot (see `isBot` hook above), render all the images right away. (useful if the bot understand javascript)
- If the user is not a bot (or if we can't decide), lazy load the images

## 🤔 FAQ <a name = "faq"></a>

**Q** How can I manually trigger the loading of images?

**A** See: https://github.com/tjoskar/ng-lazyload-image/issues/197

**Q** Does this library work with ionic or some other wrapper for Angular?

**A** Yes, but ionic and some other library wraps the whole document inside an other div so you might need to create your own scroll listener. https://github.com/tjoskar/ng-lazyload-image/issues?utf8=%E2%9C%93&q=is%3Aissue+Ionic

**Q** How can I add a transition effect between the default image and the lazy loaded image?

**A** See: https://github.com/tjoskar/ng-lazyload-image/issues/300

**Q** I can't get it to work with electron. Can you help me?

**A** Make sure you uses the [right file path](https://github.com/tjoskar/ng-lazyload-image/issues/308#issuecomment-368240550).

**Q** I'm getting the error: `NullInjectorError: No provider for ElementRef!`

**A** See: https://github.com/tjoskar/ng-lazyload-image/issues/390

**Q** I can't get it to work. Can you help me?

**A** Sure, create an issue and describe your issue in as much detail as possible.

## 🙇‍ Contributing <a name = "contributing"></a>

See the [contributing guide](CONTRIBUTING.md)


