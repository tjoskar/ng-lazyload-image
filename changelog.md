# Changelog

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
