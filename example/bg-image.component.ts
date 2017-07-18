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
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?dpr=1&auto=format&fit=crop&w=1500&h=894&q=80&cs=tinysrgb',
        'https://images.unsplash.com/photo-1474871256005-cbf50b902421?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb',
        'https://images.unsplash.com/photo-1496396297824-fdda3c54ad14?dpr=1&auto=format&fit=crop&w=1500&h=999&q=80&cs=tinysrgb'
    ];
}
