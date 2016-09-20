import { Component, Input } from '@angular/core';

@Component({
    selector: 'fade-in-image',
    styles: [`
        img {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
            transition: opacity 1s;
            opacity: 0;
        }

        img.ng2-lazyloaded {
            opacity: 1;
        }
    `],
    template: `
        <img src="https://www.placecage.com/1000/1000" [lazyLoad]="src" [errorImage]="errorImage" offset="0">
    `,
})
export class FadeInImageComponent {
    @Input() src;
    @Input() errorImage;
}
