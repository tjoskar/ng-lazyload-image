import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
        .menu {
            display: flex;
            width: 50%;
            justify-content: space-between;
            margin: 20px auto;
        }

        a {
          text-decoration: none;
          font-size: 16px;
          padding: 10px;
          transition: all .2s ease-out;
        }

        a.active, a:hover {
          background-color: #3498db;
          color: #fff !important;
        }
    `],
    template: `
        <div class="menu">
            <a routerLink="/fade-in-image" routerLinkActive="active">Fade in image</a>
            <a routerLink="/default-image" routerLinkActive="active">Default image</a>
            <a routerLink="/pixelated-image" routerLinkActive="active">Pixelated transform</a>
            <a routerLink="/bg-image" routerLinkActive="active">Background image</a>
            <a routerLink="/scroll-container" routerLinkActive="active">Scroll Container</a>
            <a routerLink="/on-load" routerLinkActive="active">OnLoad event</a>
            <a routerLink="/change-image" routerLinkActive="active">Change image</a>
            <a routerLink="/responsive-image" routerLinkActive="active">Responsive image</a>
        </div>

        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
