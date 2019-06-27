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

        img.ng-lazyloaded {
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
        'https://images.unsplash.com/photo-1468413922365-e3766a17da9e?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80',
        'https://images.unsplash.com/photo-1488388373205-a134c1cc7e4e?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80',
        'https://images.unsplash.com/photo-1422257986712-4f02edc298ce?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80'
    ];
}
