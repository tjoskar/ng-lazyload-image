import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'responsive-image',
    styles: [`
        .img-wrapper {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
        }

        img {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
        }

        img.ng-lazyloaded {
            animation: fadein .5s;
        }

        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
    `],
    template: `
        <div class="img-wrapper">
            <img [defaultImage]="defaultImage"
                [errorImage]="errorImage"
                [lazyLoad]="images1"
                [useSrcset]="true">
        </div>
        <div class="img-wrapper">
            <img [defaultImage]="defaultImage"
                [errorImage]="errorImage"
                [lazyLoad]="images2"
                [useSrcset]="true">
        </div>
        <div class="img-wrapper">
            <picture>
                <source media="(min-width: {{ screen_lg }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image2" [attr.errorImage]="errorImage">
                <source media="(min-width: {{ screen_md }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image3" [attr.errorImage]="errorImage">
                <source media="(min-width: {{ screen_sm }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image4" [attr.errorImage]="errorImage">
                <img [defaultImage]="defaultImage"
                    [errorImage]="errorImage"
                    [lazyLoad]="image1"
                    [useSrcset]="true">
            </picture>
        </div>
        <div class="img-wrapper">
            <picture>
                <source media="(min-width: {{ screen_lg }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image6" [attr.errorImage]="errorImage">
                <source media="(min-width: {{ screen_md }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image7" [attr.errorImage]="errorImage">
                <source media="(min-width: {{ screen_sm }})" [attr.defaultImage]="defaultImage" [attr.lazyLoad]="image8" [attr.errorImage]="errorImage">
                <img [defaultImage]="defaultImage"
                    [errorImage]="errorImage"
                    [lazyLoad]="image5"
                    [useSrcset]="true">
            </picture>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveImageComponent {
    screen_lg = '1200px';
    screen_md = '992px';
    screen_sm = '768px';

    errorImage = 'https://i.imgur.com/XkU4Ajf.png';
    defaultImage = 'https://www.placecage.com/1000/1000';

    images1 = `https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80 700w,
               https://images.unsplash.com/photo-1431290897562-d9453d416346?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80 900w,
               https://images.unsplash.com/photo-1437818628339-19ded67ade8e?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80 1100w`;

    images2 = `https://images.unsplash.com/photo-1443986870756-31166604c63c?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80 700w,
               https://images.unsplash.com/photo-1419332509237-efe2d26323db?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80 900w,
               https://images.unsplash.com/photo-1440091253659-eb80d9370717?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80 1100w`

    image1 = 'https://images.unsplash.com/photo-1422004707501-e8dad229e17a?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80';
    image2 = 'https://images.unsplash.com/photo-1439931444800-9bcc83f804a6?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80';
    image3 = 'https://images.unsplash.com/photo-1417128281290-30a42da46277?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80';
    image4 = 'https://images.unsplash.com/photo-1504872672611-7884b8ecd01a?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80';

    image5 = 'https://images.unsplash.com/photo-1413803694176-3244d6096628?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80';
    image6 = 'https://images.unsplash.com/photo-1415862511713-810601557946?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80';
    image7 = 'https://images.unsplash.com/photo-1437209484568-e63b90a34f8b?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80';
    image8 = 'https://images.unsplash.com/photo-1440429645186-5d305998a4d1?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80';
}
