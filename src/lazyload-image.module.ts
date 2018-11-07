import { ModuleWithProviders, NgModule } from '@angular/core';
import { LazyLoadImageDirective } from './lazyload-image.directive';
import { ModuleOptions } from './types';

@NgModule({
  declarations: [LazyLoadImageDirective],
  exports: [LazyLoadImageDirective]
})
export class LazyLoadImageModule {
  static forRoot(options: ModuleOptions): ModuleWithProviders {
    return {
      ngModule: LazyLoadImageModule,
      providers: [{ provide: 'options', useValue: options }]
    };
  }
}
