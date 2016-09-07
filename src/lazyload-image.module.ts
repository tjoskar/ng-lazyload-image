import { NgModule } from '@angular/core';
import { LazyLoadImageDirective } from './lazyload-image.directive';

@NgModule({
    declarations: [ LazyLoadImageDirective ],
    exports: [ LazyLoadImageDirective ]
})
export class LazyLoadImageModule {}
