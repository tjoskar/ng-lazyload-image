import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <lz-image *ngFor="let image of images" [src]="image" [error]="errorImg"></lz-image>
        <!-- <bg-image [src]="images[0]"></bg-image> -->
    `
})
class AppComponent {
    errorImg = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

    images = [
        'https://hd.unsplash.com/photo-1441765425173-8fd330fb4a02',
        'https://hd.unsplash.com/photo-1451481454041-104482d8e284',
        'https://hd.unsplash.com/photo-1471070855862-324d571a1857',
        'https://hd.unsplash.com/photo-1415045550139-59b6fafc832f'
    ];

}

export {AppComponent};
