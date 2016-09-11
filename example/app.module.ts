import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from '../src/lazyload-image.module';
import { AppComponent } from './app.component';
import { LazyImageComponent } from './lz-image.component';
import { BgImageComponent } from './bg-image.component';

@NgModule({
    declarations: [ AppComponent, LazyImageComponent, BgImageComponent ],
    imports: [ BrowserModule, LazyLoadImageModule ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
