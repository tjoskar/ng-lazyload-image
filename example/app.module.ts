import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { LazyLoadImageModule } from '../src/lazyload-image.module';
import { AppComponent } from './app.component';
import { FadeInImageComponent } from './fade-in-image.component';
import { BgImageComponent } from './bg-image.component';
import { DefaultImageComponent } from './default-image.component';
import { PixelatedImageComponent } from './pixelated-image.component';
import { ScrollContainerComponent } from './scroll-container.component';
import { ChangeImageComponent } from './changing-image.component';
import { OnLoadComponent } from './onload.component';
import { ResponsiveImageComponent } from './responsive-image.component';

@NgModule({
    declarations: [
      AppComponent,
      FadeInImageComponent,
      BgImageComponent,
      DefaultImageComponent,
      PixelatedImageComponent,
      ScrollContainerComponent,
      ChangeImageComponent,
      OnLoadComponent,
      ResponsiveImageComponent,
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot([
        {
          path: '',
          redirectTo: '/fade-in-image',
          pathMatch: 'full'
        },
        { path: 'change-image', component: ChangeImageComponent },
        { path: 'fade-in-image', component: FadeInImageComponent },
        { path: 'bg-image', component: BgImageComponent },
        { path: 'default-image', component: DefaultImageComponent },
        { path: 'pixelated-image', component: PixelatedImageComponent },
        { path: 'scroll-container', component: ScrollContainerComponent },
        { path: 'on-load', component: OnLoadComponent },
        { path: 'responsive-image', component: ResponsiveImageComponent },
      ]),
      LazyLoadImageModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
