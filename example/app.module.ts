import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from '../src/lazyload-image.module';
import { AppComponent } from './app.component';
import { FadeInImageComponent } from './fade-in-image.component';
import { BgImageComponent } from './bg-image.component';
import { DefaultImageComponent } from './default-image.component';
import { PixelatedImageComponent } from './pixelated-image.component';

@NgModule({
    declarations: [ AppComponent, FadeInImageComponent, BgImageComponent, DefaultImageComponent, PixelatedImageComponent ],
    imports: [ BrowserModule, LazyLoadImageModule ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
