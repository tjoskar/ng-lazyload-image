import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Attributes, IntersectionObserverHooks, LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';
import { AppComponent } from './app.component';
import { AsyncImagesComponent } from './pages/async-images.component';
import { BgImageComponent } from './pages/bg-image.component';
import { BigImagesComponent } from './pages/big-images.component';
import { ChangeImageComponent } from './pages/changing-image.component';
import { CustomObserverComponent } from './pages/custom-observer';
import { DefaultImageComponent } from './pages/default-image.component';
import { FadeInImageComponent } from './pages/fade-in-image.component';
import { OffsetComponent } from './pages/offset.component';
import { OnStateChangeComponent } from './pages/on-state-change.component';
import { PixelatedImageComponent } from './pages/pixelated-image.component';
import { ResponsiveImageComponent } from './pages/responsive-image.component';
import { ScrollContainerComponent } from './pages/scroll-container.component';

/**
 * Just a silly example to demonstrate hooks
 */
export class LazyLoadImageHooks extends IntersectionObserverHooks {
  onAttributeChange(newAttributes: Attributes) {
    console.log(`New attributes: ${newAttributes}`);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FadeInImageComponent,
    BgImageComponent,
    DefaultImageComponent,
    PixelatedImageComponent,
    ScrollContainerComponent,
    ChangeImageComponent,
    OnStateChangeComponent,
    ResponsiveImageComponent,
    BigImagesComponent,
    AsyncImagesComponent,
    CustomObserverComponent,
    OffsetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/fade-in-image',
        pathMatch: 'full',
      },
      { path: 'change-image', component: ChangeImageComponent },
      { path: 'fade-in-image', component: FadeInImageComponent },
      { path: 'bg-image', component: BgImageComponent },
      { path: 'default-image', component: DefaultImageComponent },
      { path: 'pixelated-image', component: PixelatedImageComponent },
      { path: 'scroll-container', component: ScrollContainerComponent },
      { path: 'on-load', component: OnStateChangeComponent },
      { path: 'responsive-image', component: ResponsiveImageComponent },
      { path: 'big-images', component: BigImagesComponent },
      { path: 'async-images', component: AsyncImagesComponent },
      { path: 'custom-observer', component: CustomObserverComponent },
      { path: 'offset', component: OffsetComponent },
    ]),
    LazyLoadImageModule,
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks }],
  bootstrap: [AppComponent],
})
export class AppModule {}
