///<reference path="../typings/main.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var rxjs_1 = require('rxjs');
var LazyLoadImageDirective = (function () {
    function LazyLoadImageDirective(el) {
        this.viewportSize = {
            height: 0,
            width: 0
        };
        this.elementRef = el;
    }
    LazyLoadImageDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.updateViewportOffset();
        this.scrollSubscription = rxjs_1.Observable
            .merge(rxjs_1.Observable.of(1), // Fake a scroll event
        rxjs_1.Observable.fromEvent(window, 'scroll'))
            .sampleTime(100)
            .filter(function () { return _this.isVisible(); })
            .switchMap(function () { return _this.loadImage(_this.lazyImage); })
            .map(function () { return _this.setImage(_this.lazyImage); })
            .finally(function () { return _this.setLoadedStyle(); })
            .subscribe(function () { return _this.ngOnDestroy(); }, function (error) {
            _this.setImage(_this.defaultImg);
            _this.ngOnDestroy();
        });
    };
    LazyLoadImageDirective.prototype.loadImage = function (image) {
        return rxjs_1.Observable
            .create(function (observer) {
            var img = new Image();
            img.src = image;
            img.onload = function () {
                observer.next(img);
                observer.complete();
            };
            img.onerror = function (err) {
                observer.error(err);
                observer.complete();
            };
        });
    };
    LazyLoadImageDirective.prototype.setImage = function (image) {
        this.elementRef.nativeElement.src = image;
    };
    LazyLoadImageDirective.prototype.setLoadedStyle = function () {
        var styles = this.elementRef.nativeElement.className
            .split(' ')
            .filter(function (s) { return !!s; })
            .filter(function (s) { return s !== 'ng2-lazyloading'; });
        styles.push('ng2-lazyloaded');
        this.elementRef.nativeElement.className = styles;
    };
    LazyLoadImageDirective.prototype.isVisible = function () {
        var rect = this.elementRef.nativeElement.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            (rect.bottom - rect.height) <= this.viewportSize.height &&
            (rect.right - rect.width) <= this.viewportSize.width);
    };
    LazyLoadImageDirective.prototype.updateViewportOffset = function () {
        this.viewportSize.height = (window.innerHeight || document.documentElement.clientHeight) + (this.offset | 0);
        this.viewportSize.width = (window.innerWidth || document.documentElement.clientWidth) + (this.offset | 0);
    };
    LazyLoadImageDirective.prototype.ngOnDestroy = function () {
        [this.scrollSubscription]
            .filter(function (subscription) { return subscription && !subscription.isUnsubscribed; })
            .forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    __decorate([
        core_1.Input('lazyLoad'), 
        __metadata('design:type', Object)
    ], LazyLoadImageDirective.prototype, "lazyImage");
    __decorate([
        core_1.Input('src'), 
        __metadata('design:type', Object)
    ], LazyLoadImageDirective.prototype, "defaultImg");
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LazyLoadImageDirective.prototype, "offset");
    LazyLoadImageDirective = __decorate([
        core_1.Directive({
            selector: '[lazyLoad]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LazyLoadImageDirective);
    return LazyLoadImageDirective;
})();
exports.LazyLoadImageDirective = LazyLoadImageDirective;
exports.__esModule = true;
exports["default"] = LazyLoadImageDirective;
