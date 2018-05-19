# Changelog

## 4.0.0 (2018-05-19)

### Braking changes
* Upgrade rxjs to version 6
* Upgrade angular compiler to version 6

### Bugfix
* Empty rect with an offset shouldn't be loaded. Closes [#333](https://github.com/tjoskar/ng-lazyload-image/issues/333) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.4.2 (2018-01-09)

### Bugfix
* ReferenceError: HTMLElement is not defined. Closes [#271](https://github.com/tjoskar/ng-lazyload-image/issues/271) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.4.1 (2018-01-07)

### Bugfix
* Check against container bounds if given. Closes [#241](https://github.com/tjoskar/ng-lazyload-image/issues/241) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.4.0 (2018-01-01)

### Feature
* Add support for srcset. Closes [#175](https://github.com/tjoskar/ng-lazyload-image/issues/175) Thanks to [sapierens](https://github.com/sapierens) :tada:

## 3.3.5 (2017-11-12)

* Downgrade typescript. Closes [#222](https://github.com/tjoskar/ng-lazyload-image/issues/222)

## 3.3.4 (2017-11-05)

* Upgrade to angular 5

## 3.3.3 (2017-09-29)

### Bugfix
* Fix multiple ng-lazyloaded class. Closes [#201](https://github.com/tjoskar/ng-lazyload-image/issues/201) Thanks to [vaidiep](https://github.com/vaidiep) :tada:

## 3.3.2 (2017-09-07)

### Bugfix
* Fix arguments for the AoT Compiler

## 3.3.1 (2017-08-19)

### Bugfix
* Offset should expand the window. Closes [#192](https://github.com/tjoskar/ng-lazyload-image/issues/192)

## 3.3.0 (2017-08-19)

### Feature
* Make it possible to update the images on the fly. Closes [#187](https://github.com/tjoskar/ng-lazyload-image/issues/187), [#140](https://github.com/tjoskar/ng-lazyload-image/issues/140)

## 3.2.3 (2017-08-13)

### Bugfix
* Take offset into account for top and bottom. Closes [#192](https://github.com/tjoskar/ng-lazyload-image/issues/193)

## 3.2.2 (2017-07-24)

### Bugfix
* Disable directive on server side. Closes [#178](https://github.com/tjoskar/ng-lazyload-image/issues/178), [#183](https://github.com/tjoskar/ng-lazyload-image/issues/183). Thanks to [rimlin](https://github.com/rimlin) :tada:

## 3.2.0 (2017-07-18)

### Feature
* Add ability to get notified when the image is loaded. Closes [#176](https://github.com/tjoskar/ng-lazyload-image/issues/176). Thanks to [rimlin](https://github.com/rimlin) :tada:

## 3.1.1 (2017-05-11)

### Feature
* Support server-side rendering. Closes [#101](https://github.com/tjoskar/ng-lazyload-image/issues/101). Thanks to [kevinphelps](https://github.com/kevinphelps) :tada:

## 3.1.0 (2017-04-01)

### Feature
* Add a css class when a loading error occurs. Thanks to [diogoqueiros](https://github.com/diogoqueiros) :tada:

## 3.0.0 (2017-03-25)

### Feature
* Upgrade to Angular v4
* Renamed project to ng-lazyload-image

### Braking changes
* Renamed css class names from `ng2-lazyloaded` and `ng2-lazyloading` to `ng-lazyloaded` and `ng-lazyloading` respectively

## 2.4.0 (2017-02-19)

### Features
* Make it possible to use a default image as background. Closes [#115](https://github.com/tjoskar/ng-lazyload-image/issues/115). Thanks to [igoralemasow](https://github.com/igoralemasow) :tada:

## 2.3.2 (2017-02-07)

### Bug Fixes
* Remove `src` as directive input. Closes [#44](https://github.com/tjoskar/ng-lazyload-image/issues/44)
