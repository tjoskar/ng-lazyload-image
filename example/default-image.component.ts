import { Component, Input } from '@angular/core';

@Component({
    selector: 'default-image',
    styles: [`
        img {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
        }

        img.ng2-lazyloaded {
            animation: fadein .5s;
        }

        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
    `],
    template: `
        <img src="https://www.placecage.com/1000/1000" [lazyLoad]="src" [errorImage]="errorImage" offset="0">
    `,
})
export class DefaultImageComponent {
    @Input() src;
    @Input() errorImage;
}
