import { Component, ChangeDetectionStrategy } from '@angular/core';
import { from, asyncScheduler } from "rxjs";

@Component({
  selector: 'async-image',
  template: `
    <p>Using "Promise.resolve('path')"</p>
    <img [defaultImage]="defaultImage" [errorImage]="errorImage" [lazyLoad]="promiseImage | async" />

    <p>Using "from(['path'])"</p>
    <img [defaultImage]="defaultImage" [errorImage]="errorImage" [lazyLoad]="rxjsFromImage | async" />

    <p>Using Promise and setTimeout</p>
    <img [defaultImage]="defaultImage" [errorImage]="errorImage" [lazyLoad]="timeoutImage | async" />

    <p>Using asyncScheduler</p>
    <img [defaultImage]="defaultImage" [errorImage]="errorImage" [lazyLoad]="asyncSchedulerImage | async" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncImagesComponent {
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';
  defaultImage = 'https://www.placecage.com/300/300';
  
  promiseImage = Promise.resolve('https://picsum.photos/id/236/300/300');
  rxjsFromImage = from(['https://picsum.photos/id/237/300/300'])
  timeoutImage = new Promise(r => setTimeout(r, 0, 'https://picsum.photos/id/238/300/300'))
  asyncSchedulerImage = from(Promise.resolve('https://picsum.photos/id/239/300/300'), asyncScheduler)
}
