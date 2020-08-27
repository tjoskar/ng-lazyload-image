# Changelog

## 9.0.1 (2020-07-25)

### Bug fix

- Fixing ScrollHooks for Angular 8. See [#476](https://github.com/tjoskar/ng-lazyload-image/issues/476)

## 9.0.0 (2020-07-25)

### Bug fix

- In some cases users are facing the error: "useClass cannot be undefined". I don't know why but it seams to have something to do with Ivy. See: #463 The solution to this issue was to remove `forRoot` and instead export a `InjectionToken` that the user can use to inject a custom Hook set. See Braking change below:

### Braking change

Before:
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule, IntersectionObserverHooks, Attributes } from 'ng-lazyload-image';
import { AppComponent } from './app.component';

class LazyLoadImageHooks extends IntersectionObserverHooks {
  async loadImage({ imagePath }: Attributes): Promise<string> {
    return await fetch(imagePath, {
      headers: {
        Authorization: 'Bearer ...',
      },
    })
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LazyLoadImageModule.forRoot(LazyLoadImageHooks)],
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```

After:
```ts
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule, IntersectionObserverHooks, Attributes, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';
import { AppComponent } from './app.component';

export class LazyLoadImageHooks extends IntersectionObserverHooks {
  async loadImage({ imagePath }: Attributes): Promise<string> {
    return await fetch(imagePath, {
      headers: {
        Authorization: 'Bearer ...',
      },
    })
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LazyLoadImageModule],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks }],
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```

When using dependencies:

Before:
```ts
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LazyLoadImageModule, IntersectionObserverHooks, Attributes } from 'ng-lazyload-image';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from './app.component';

export class LazyLoadImageHooks extends IntersectionObserverHooks {
  private http: HttpClient;

  constructor(http: HttpClient) {
    super();
    this.http = http;
  }

  loadImage({ imagePath }: Attributes): Observable<string> {
    // Load the image through `HttpClient` and cancel the request if the user change page or the image gets removed
    return this.http.get(imagePath, { responseType: 'blob' }).pipe(map(blob => URL.createObjectURL(blob)));
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, LazyLoadImageModule.forRoot(IntersectionObserverHooks, [HttpClient])],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks }],
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```

After:
```ts
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LazyLoadImageModule, IntersectionObserverHooks, Attributes, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from './app.component';

@Injectable()
export class LazyLoadImageHooks extends IntersectionObserverHooks {
  private http: HttpClient;

  constructor(http: HttpClient) {
    super();
    this.http = http;
  }

  loadImage({ imagePath }: Attributes): Observable<string> {
    // Load the image through `HttpClient` and cancel the request if the user change page or the image gets removed
    return this.http.get(imagePath, { responseType: 'blob' }).pipe(map(blob => URL.createObjectURL(blob)));
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, LazyLoadImageModule],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks }],
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```



## 8.0.1 (2020-05-29)

### Bug fix

- Honor referrerpolicy on the image. Closes #422
- Use `skipLazyLoading` instead of `isBot` for checking if the image should be loaded or not.

## 8.0.0 (2020-05-29)

### Feature

- Using a class based hook system for easier customisation.

### Braking changes

- Using classes instead of object in order to use the DI system. You will now have to create a class instead of a object if you want to use the hook system.

Before:
```ts
function loadImage({ imagePath }: LoadImageProps): Promise<string> {
  return fetch(imagePath, {
    headers: {
      Authorization: 'Bearer ...'
    }
  })
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob));
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LazyLoadImageModule.forRoot({ loadImage })],
  bootstrap: [AppComponent]
})
export class MyAppModule {}
```

After:
```ts
import { LazyLoadImageModule, IntersectionObserverHooks, Attributes } from 'ng-lazyload-image';

class LazyLoadImageHooks extends IntersectionObserverHooks {
  loadImage({ imagePath }: Attributes): Promise<string> {
    return fetch(imagePath, {
      headers: {
        Authorization: 'Bearer ...',
      },
    })
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LazyLoadImageModule.forRoot(LazyLoadImageHooks)],
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```

This is also true if you want to use scroll events:

Before
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset
    })
  ],
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```

After:
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LazyLoadImageModule.forRoot(ScrollHooks)],
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```

- The deprecated event emitter `onLoad` is now removed.

Before:
```ts
myCallbackFunction(isLoaded: boolean) {
  isLoaded // true if the image get loaded, otherwise false
}
```

```html
<img [lazyLoad]="lazyLoadImage" (onLoad)="myCallbackFunction($event)">
```

After:
```ts
myCallbackFunction(event: StateChange) {
  const isLoaded = event.reason === 'loading-succeeded';

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

```html
<img [lazyLoad]="lazyLoadImage" (onStateChange)="myCallbackFunction($event)">
```


## 7.1.0 (2020-02-22)

### Feature

- Adding the css class `ng-lazyloading` in the setup and removing it in the `finally` event. Closes [#428](https://github.com/tjoskar/ng-lazyload-image/issues/428).
- Adding the `onStateChange` event emitter and deprecating `onLoad`. Closes [#425](https://github.com/tjoskar/ng-lazyload-image/issues/425).

### Bugfig

- Do nothing if no image path is provided. Closes [#421](https://github.com/tjoskar/ng-lazyload-image/issues/421).

## 7.0.1 (2019-10-22)

### Bugfix

- It was not possible to overwrite `isBot` for SSR. Closes [#414](https://github.com/tjoskar/ng-lazyload-image/issues/414) Thanks to [intellix](https://github.com/intellix) :tada:

## 7.0.0 (2019-10-15)

### Feature

- Load all images right away when the `isBot` returns true (checking userAgent by default) [PR](https://github.com/tjoskar/ng-lazyload-image/pull/412). Closes [#394](https://github.com/tjoskar/ng-lazyload-image/pull/394), [#393](https://github.com/tjoskar/ng-lazyload-image/issues/393)

### Braking changes

- Use IntersectionObserver by default. If you want to use the scroll listener you have to use the `scrollPreset`. eg.

```ts
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

- Rename `scrollObservable` to `customObservable`.
Before:
```html
<img [scrollObservable]="scroll$" ... >
```
After 7.0.0
```html
<img [customObservable]="scroll$" ... >
```

- The images is not decode by default before instert into the dom. If you want the images to be decoded you have to set `decode` to true:

```html
<img decode="true" ... >
<div decode="true" ... >
```

## 6.1.0 (2019-08-07)

### Feature

- Decode image before render. Closes [#395](https://github.com/tjoskar/ng-lazyload-image/issues/395)

### Bugfix

- IntersectionObserver is not defined for SSR. Closes [#396](https://github.com/tjoskar/ng-lazyload-image/issues/396) Thanks to [felipefialho](https://github.com/felipefialho) :tada:

## 6.0.0 (2019-06-27)

### Braking changes

- Building with angular@8. angular@6 is no longer supported.

## 5.1.0 (2019-04-01)

### Feature

- Build releases for modules, comonjs and more. Closes [#373](https://github.com/tjoskar/ng-lazyload-image/issues/373) and [#368](https://github.com/tjoskar/ng-lazyload-image/issues/368)
- Export types for hooks. Closes [#383](https://github.com/tjoskar/ng-lazyload-image/issues/383)

### Bugfix

- Update docs. Closes [#373](https://github.com/tjoskar/ng-lazyload-image/issues/373)

### Braking changes

- Compiling to ES2015 modules. Closes [#363](https://github.com/tjoskar/ng-lazyload-image/issues/363)

## 5.0.0 (2018-11-07)

### Braking changes

- Compiling to ES2015 modules. Closes [#363](https://github.com/tjoskar/ng-lazyload-image/issues/363)

## 4.1.0 (2018-11-07)

### Feature

- Introduce hooks. See [#365](https://github.com/tjoskar/ng-lazyload-image/issues/365)

## 4.0.0 (2018-05-19)

### Braking changes

- Upgrade rxjs to version 6
- Upgrade angular compiler to version 6

### Bugfix

- Empty rect with an offset shouldn't be loaded. Closes [#333](https://github.com/tjoskar/ng-lazyload-image/issues/333) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.4.2 (2018-01-09)

### Bugfix

- ReferenceError: HTMLElement is not defined. Closes [#271](https://github.com/tjoskar/ng-lazyload-image/issues/271) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.4.1 (2018-01-07)

### Bugfix

- Check against container bounds if given. Closes [#241](https://github.com/tjoskar/ng-lazyload-image/issues/241) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.4.0 (2018-01-01)

### Feature

- Add support for srcset. Closes [#175](https://github.com/tjoskar/ng-lazyload-image/issues/175) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.3.5 (2017-11-12)

- Downgrade typescript. Closes [#222](https://github.com/tjoskar/ng-lazyload-image/issues/222)

## 3.3.4 (2017-11-05)

- Upgrade to angular 5

## 3.3.3 (2017-09-29)

### Bugfix

- Fix multiple ng-lazyloaded class. Closes [#201](https://github.com/tjoskar/ng-lazyload-image/issues/201) Thanks to [vaidiep](https://github.com/vaidiep) :tada:

## 3.3.2 (2017-09-07)

### Bugfix

- Fix arguments for the AoT Compiler

## 3.3.1 (2017-08-19)

### Bugfix

- Offset should expand the window. Closes [#192](https://github.com/tjoskar/ng-lazyload-image/issues/192)

## 3.3.0 (2017-08-19)

### Feature

- Make it possible to update the images on the fly. Closes [#187](https://github.com/tjoskar/ng-lazyload-image/issues/187), [#140](https://github.com/tjoskar/ng-lazyload-image/issues/140)

## 3.2.3 (2017-08-13)

### Bugfix

- Take offset into account for top and bottom. Closes [#192](https://github.com/tjoskar/ng-lazyload-image/issues/193)

## 3.2.2 (2017-07-24)

### Bugfix

- Disable directive on server side. Closes [#178](https://github.com/tjoskar/ng-lazyload-image/issues/178), [#183](https://github.com/tjoskar/ng-lazyload-image/issues/183). Thanks to [rimlin](https://github.com/rimlin) :tada:

## 3.2.0 (2017-07-18)

### Feature

- Add ability to get notified when the image is loaded. Closes [#176](https://github.com/tjoskar/ng-lazyload-image/issues/176). Thanks to [rimlin](https://github.com/rimlin) :tada:

## 3.1.1 (2017-05-11)

### Feature

- Support server-side rendering. Closes [#101](https://github.com/tjoskar/ng-lazyload-image/issues/101). Thanks to [kevinphelps](https://github.com/kevinphelps) :tada:

## 3.1.0 (2017-04-01)

### Feature

- Add a css class when a loading error occurs. Thanks to [diogoqueiros](https://github.com/diogoqueiros) :tada:

## 3.0.0 (2017-03-25)

### Feature

- Upgrade to Angular v4
- Renamed project to ng-lazyload-image

### Braking changes

- Renamed css class names from `ng2-lazyloaded` and `ng2-lazyloading` to `ng-lazyloaded` and `ng-lazyloading` respectively

## 2.4.0 (2017-02-19)

### Features

- Make it possible to use a default image as background. Closes [#115](https://github.com/tjoskar/ng-lazyload-image/issues/115). Thanks to [igoralemasow](https://github.com/igoralemasow) :tada:

## 2.3.2 (2017-02-07)

### Bug Fixes

- Remove `src` as directive input. Closes [#44](https://github.com/tjoskar/ng-lazyload-image/issues/44)
