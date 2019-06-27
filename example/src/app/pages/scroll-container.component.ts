import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
    selector: 'scroll-container',
    styles: [`
        img {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
        }

        img.ng-lazyloaded {
            animation: fadein .5s;
        }

        .scroll-container {
            height: 500px;
            overflow: scroll;
            border: 2px solid red;
            margin-bottom: 100px;
        }

        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
    `],
    template: `
    <h1>Using querySelector</h1>
    <div class="scroll-container" id="my-scroll-container">
        <img
            *ngFor="let image of images"
            [defaultImage]="defaultImage"
            [errorImage]="errorImage"
            [scrollTarget]="myScrollContainer"
            [lazyLoad]="image">
    </div>

    <h1>Using template variable</h1>
    <div class="scroll-container" #scrollableDiv>
        <img
            *ngFor="let image of images"
            [defaultImage]="defaultImage"
            [errorImage]="errorImage"
            [scrollTarget]="scrollableDiv"
            [lazyLoad]="image">
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollContainerComponent {
    myScrollContainer;
    images = [
        'https://images.unsplash.com/photo-1467932760935-519284fc87fa?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80',
        'https://images.unsplash.com/photo-1468103933896-2c34a78104c2?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80',
        'https://images.unsplash.com/photo-1471201187657-6406da15e43b?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80'
    ];
    errorImage = 'https://i.imgur.com/XkU4Ajf.png';
    defaultImage = 'https://www.placecage.com/1000/1000';

    constructor(private elmRef: ElementRef) {}

    ngOnInit() {
        this.myScrollContainer = this.elmRef.nativeElement.querySelector('#my-scroll-container');
    }
}
