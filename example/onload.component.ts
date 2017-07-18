import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'default-image',
    styles: [`
        img {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
        }
    `],
    template: `
        <div *ngIf="isLoading">Image is loading...</div>
        <div *ngIf="!isLoading">Image is loaded</div>
        <div [hidden]="isLoading">
            <img
                [defaultImage]="defaultImage"
                [errorImage]="errorImage"
                [lazyLoad]="image"
                (onLoad)="onLoad()">
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnLoadComponent {
    isLoading = true;
    errorImage = 'https://i.imgur.com/XkU4Ajf.png';
    defaultImage = 'https://www.placecage.com/1000/1000';
    image = 'https://www.placecage.com/3500/3500';

    constructor(private cd: ChangeDetectorRef) {}

    onLoad() {
        this.isLoading = false;
        this.cd.detectChanges();
    }
}
