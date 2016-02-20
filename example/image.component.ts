import {Component, Input} from 'angular2/core';
import {LazyLoadImageDirective} from '../src/lazy-load-image.directive';

@Component({
    selector: 'image',
    template: `
        <img
            src="https://www.placecage.com/1000/1000"
            [lazyLoad]="image"
            offset="0"
        >
    `,
    directives: [LazyLoadImageDirective]
})
class ImageComponent {
    @Input('src') image;
}

export {ImageComponent};
