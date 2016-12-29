import { Component, ChangeDetectionStrategy } from '@angular/core';

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
      <img
        *ngFor="let image of images"
        src="https://www.placecage.com/1000/1000"
        [errorImage]="errorImage"
        [lazyLoad]="image">
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultImageComponent {
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';

  images = [
      'https://hd.unsplash.com/photo-1449023859676-22e61b0c0695',
      'https://hd.unsplash.com/photo-1451324119451-db0ac857463c',
      'https://hd.unsplash.com/photo-1464746133101-a2c3f88e0dd9'
  ];
}
