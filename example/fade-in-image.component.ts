import { Component, ChangeDetectionStrategy } from '@angular/core';

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
        <img
          *ngFor="let image of images"
          [defaultImage]="defaultImage"
          [errorImage]="errorImage"
          [lazyLoad]="image">
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FadeInImageComponent {
    errorImage = 'https://i.imgur.com/XkU4Ajf.png';
    defaultImage = 'https://www.placecage.com/1000/1000';

    images = [
        'https://hd.unsplash.com/photo-1441765425173-8fd330fb4a02',
        'https://hd.unsplash.com/photo-1451481454041-104482d8e284',
        'https://hd.unsplash.com/photo-1471070855862-324d571a1857',
        'https://hd.unsplash.com/photo-1415045550139-59b6fafc832f'
    ];
}
