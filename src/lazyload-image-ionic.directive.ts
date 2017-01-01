import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Directive, ElementRef, Input, NgZone, Host } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { getScrollListener } from './scroll-listener';

@Directive({
    selector: '[lazyLoad]'
})
export class LazyLoadImageIonicDirective {
    @Input('lazyLoad') lazyImage;
    @Input('src') defaultImg;
    @Input('errorImage') errorImg;
    @Input() offset;

    constructor(@Host() private _content: any, private el: ElementRef) {}

    ngOnInit() {
        console.log(this._content);
    }

}
