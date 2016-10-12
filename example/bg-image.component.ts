import { Component } from '@angular/core';

@Component({
    selector: 'bg-image',
    styles: [`
        div {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
            background-position: center;
            background-size: cover;
            transition: opacity 1s;
            opacity: 0;
        }
        .ng2-lazyloaded {
            opacity: 1;
        }
    `],
    template: `
      <div
        *ngFor="let image of images"
        src="https://www.placecage.com/1000/1000"
        [lazyLoad]="image"
        [errorImage]="errorImage">
    `
})
export class BgImageComponent {
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';

  images = [
      'https://hd.unsplash.com/photo-1470165525439-3cf9e6dccbad',
      'https://hd.unsplash.com/photo-1471109880861-75a04f9b7833',
      'https://hd.unsplash.com/photo-1431400445088-1750c997c6b5'
  ];
}
