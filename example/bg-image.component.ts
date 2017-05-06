import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'bg-image',
    styles: [`
        div {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
            background-position: center;
            background-size: cover;
        }

        div.ng-lazyloaded {
            animation: fadein .5s;
        }

        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
    `],
    template: `
      <div
        *ngFor="let image of images"
        [defaultImage]="defaultImage"
        [lazyLoad]="image"
        [errorImage]="errorImage">
      </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BgImageComponent {
    errorImage = 'https://i.imgur.com/XkU4Ajf.png';
    defaultImage = 'https://www.placecage.com/1000/1000';

    images = [
        'https://hd.unsplash.com/photo-1470165525439-3cf9e6dccbad',
        'https://hd.unsplash.com/photo-1471109880861-75a04f9b7833',
        'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5'
    ];
}
