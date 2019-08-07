import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bg-image',
  styles: [
    `
      .image-container {
        padding-top: 1000px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }

      .image-card {
        width: 250px;
        height: 250px;
        background-color: red;
        background-size: cover;
        background-repeat: no-repeat;
      }
    `
  ],
  template: `
    <div class="image-container">
      <div *ngFor="let item of imageArray" class="image-card" [defaultImage]="defaultImage" [lazyLoad]="item"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigImagesComponent {
  defaultImage = 'https://www.placecage.com/1000/1000';

  imageArray = [
    'https://images.unsplash.com/photo-1563769874043-9eac75ae0049',
    'https://images.unsplash.com/photo-1561209309-d72e5babe14e',
    'https://images.unsplash.com/photo-1563775421597-ecf0fc7f9c04'
  ];
}
