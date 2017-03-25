import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pixelated-image',
    styles: [`
        .wrapper {
            position: relative;
            width: 100%;
            height: 1000px;
            min-width: 960px;
        }
        img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .fanart {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: 0 0;
            background-size: cover;
            transition: opacity 1s;
            opacity: 0;
        }
        .ng-lazyloaded {
            opacity: 1;
        }
    `],
    template: `
        <div class="wrapper">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBCgoKCgoKCwwMCw8RDxEPFxUTExUXIhkaGRoZIjQhJiEhJiE0LjguKy44LlNBOjpBU2BRTFFgdGhodJOLk8DA///AABEIAAUABQMBEQACEQEDEQH/xABcAAEAAAAAAAAAAAAAAAAAAAAHEAEAAgEFAAAAAAAAAAAAAAACAQMRAAQFB0EBAQEAAAAAAAAAAAAAAAAAAAMEEQAABQUAAAAAAAAAAAAAAAAAAQIDQRITISKR/9oADAMBAAIRAxEAPwAZjt2+oGm3hNumMwmLmIUx7ic6mtPQ/iNSC1plsuj/2Q==">
            <div class="fanart" lazyLoad="https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?ixlib=rb-0.3.5&q=80&fm=jpg"></div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PixelatedImageComponent {}
