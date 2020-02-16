import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'custom-observer',
  styles: [
    `
      img {
        width: 480px;
        min-height: 640px;
        transition: opacity 1s;
        opacity: 0;
      }
      img.ng-lazyloaded {
        opacity: 1;
      }
    `
  ],
  template: `
    <div style="position: fixed; z-index: 100;">
      <button (click)="loadImages()">Load Images</button>
    </div>
    <div *ngFor="let image of images">
      <img height="480" [lazyLoad]="image" [customObservable]="loading$">
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomObserverComponent {
  defaultImage = 'https://www.placecage.com/1000/1000';
  images = [
    'https://placeimg.com/640/480/any',
    'https://placeimg.com/650/480/any',
    'https://placeimg.com/660/480/any',
    'https://placeimg.com/670/480/any',
    'https://placeimg.com/680/480/any',
    'https://placeimg.com/690/480/any',
    'https://placeimg.com/700/480/any',
    'https://placeimg.com/710/480/any'
  ];

  loading$ = new Subject();

  loadImages() {
    console.log('loading images')
    // We are using the (default) intersection observer preset
    // we will therefore need to follow its interface and set `isIntersecting` to true.
    this.loading$.next({ isIntersecting: true });
  }
}
