import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fade-in-image',
  styles: [
    `
      .image {
        width: 500px;
        height: 500px;
      }

      .scroll-block {
        height: 1000px;
        width: 3000px;
      }

      .red-block {
        background-color: red;
        height: 300px;
        width: 300px;
      }
    `
  ],
  template: `
    <div class="scroll-block">
      <h2>Scroll down or to the right to load images</h2>
      <div style="float:right; display:flex;">
        <div class="red-block">Will load the image now</div>
        <div class="image" [defaultImage]="defaultImage" [lazyLoad]="image2" offset="300"></div>
      </div>
    </div>

    <div class="red-block">Will load the image now</div>

    <img class="image" [defaultImage]="defaultImage" [lazyLoad]="image" offset="300" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffsetComponent {
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1468413922365-e3766a17da9e?dpr=2&auto=compress,format&fit=crop&w=500&q=80';
  image2 = 'https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80';
}
