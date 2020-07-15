import { NgModule } from '@angular/core';
import { LazyLoadImageDirective } from './lazyload-image.directive';
import { IntersectionObserverHooks } from './intersection-observer-hooks/hooks';
import { LAZYLOAD_IMAGE_HOOKS } from './token';

@NgModule({
  declarations: [LazyLoadImageDirective],
  exports: [LazyLoadImageDirective],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: IntersectionObserverHooks }],
})
export class LazyLoadImageModule {}
