import {NgModule} from '@angular/core';
import {LazyLoadImageDirective} from './lazyload-image.directive';
import {WindowService} from "./window.service";

@NgModule({
  declarations: [LazyLoadImageDirective],
  providers: [WindowService],
  exports: [LazyLoadImageDirective]
})
export class LazyLoadImageModule {
}
