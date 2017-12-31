import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'default-image',
    styles: [`
        img {
            width: 100%;
        }
        img.hidden {
            visibility: hidden;
        }
    `],
    template: `
        <div *ngIf="isLoading">Image is loading...</div>
        <div *ngIf="!isLoading">Image is loaded</div>
        <div [ngClass]="{'hidden': isLoading}">
            <img
                [defaultImage]="defaultImage"
                [errorImage]="errorImage"
                [lazyLoad]="image"
                (onLoad)="onLoadImage($event)">
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnLoadComponent {
    isLoading = true;
    errorImage = 'https://i.imgur.com/XkU4Ajf.png';
    defaultImage = 'https://www.placecage.com/1000/1000';
    image = 'https://images.unsplash.com/photo-1467932760935-519284fc87fa?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80';

    constructor(private cd: ChangeDetectorRef) {}

    onLoadImage(success) {
        if (success) {
            this.isLoading = false;
            this.cd.detectChanges();
        } else {
            alert('Image cannot be loaded!');
        }
    }
}
