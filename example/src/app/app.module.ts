import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { AppComponent } from './app.component';
import { FadeInImageComponent } from './pages/fade-in-image.component';
import { BgImageComponent } from './pages/bg-image.component';
import { DefaultImageComponent } from './pages/default-image.component';
import { PixelatedImageComponent } from './pages/pixelated-image.component';
import { ScrollContainerComponent } from './pages/scroll-container.component';
import { ChangeImageComponent } from './pages/changing-image.component';
import { OnLoadComponent } from './pages/onload.component';
import { ResponsiveImageComponent } from './pages/responsive-image.component';
import { BigImagesComponent } from './pages/big-images.component';
import { AsyncImagesComponent } from './pages/async-images.component';
import { CustomObserverComponent } from './pages/custom-observer';

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
    BigImagesComponent,
    AsyncImagesComponent,
    CustomObserverComponent
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
      { path: 'big-images', component: BigImagesComponent },
      { path: 'async-images', component: AsyncImagesComponent },
      { path: 'custom-observer', component: CustomObserverComponent }
    ]),
    LazyLoadImageModule.forRoot(intersectionObserverPreset)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
