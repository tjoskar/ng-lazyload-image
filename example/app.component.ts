import { Component } from '@angular/core';
import { ImageComponent } from './image.component';
import { BgImageComponent } from './bg-image.component';

@Component({
    selector: 'my-app',
    template: `
        <image *ngFor="let image of images" [src]="image" [error]="errorImg"></image>
        <!-- <bg-image [src]="images[0]"></bg-image> -->
    `,
    directives: [ ImageComponent, BgImageComponent ]
})
class AppComponent {
    errorImg = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    images = [
        // TODO: Add here invalid links and img will show errorImg
        'https://images.unsplash.com/photo-1431887773042-803ed52bed26?fm=jpg',
        'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg',
        'https://images.unsplash.com/photo-1448960968772-b63b3f40dfc1?fm=jpg',
        'https://images.unsplash.com/photo-1432256851563-20155d0b7a39?fm=jpg'
    ];

}

export {AppComponent};
