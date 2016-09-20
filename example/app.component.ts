import { Component } from '@angular/core';

export enum ExampleType {
    fadeIn, default, pixelated, background
}

@Component({
    selector: 'my-app',
    styles: [`
        .menu {
            display: flex;
            width: 50%;
            justify-content: space-between;
            margin: 0 auto;
        }

        .menu p {
            cursor: pointer;
            text-decoration: underline;
            color: #3c9bf3;
        }
    `],
    template: `
        <div class="menu">
            <p (click)="changeImageExample(${ExampleType.fadeIn})">Fade in image</p>
            <p (click)="changeImageExample(${ExampleType.default})">Default image</p>
            <p (click)="changeImageExample(${ExampleType.pixelated})">Pixelated transform</p>
            <p (click)="changeImageExample(${ExampleType.background})">Background image</p>
        </div>

        <template [ngIf]="exampleType === ${ExampleType.fadeIn}">
            <fade-in-image *ngFor="let image of images" [src]="image" [errorImage]="errorImage"></fade-in-image>
        </template>
        <template [ngIf]="exampleType === ${ExampleType.default}">
            <default-image *ngFor="let image of images" [src]="image" [errorImage]="errorImage"></default-image>
        </template>
        <template [ngIf]="exampleType === ${ExampleType.pixelated}">
            <pixelated-image></pixelated-image>
        </template>
        <template [ngIf]="exampleType === ${ExampleType.background}">
            <bg-image [src]="images[3]" [errorImage]="errorImage"></bg-image>
        </template>
    `
})
export class AppComponent {
    exampleType: ExampleType = ExampleType.fadeIn;

    errorImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

    images = [
        'https://hd.unsplash.com/photo-1441765425173-8fd330fb4a02',
        'https://hd.unsplash.com/photo-1451481454041-104482d8e284',
        'https://hd.unsplash.com/photo-1471070855862-324d571a1857',
        'https://hd.unsplash.com/photo-1415045550139-59b6fafc832f'
    ];

    changeImageExample(type: ExampleType) {
        this.exampleType = type;
    }

}
