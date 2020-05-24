import { ModuleWithProviders, NgModule } from '@angular/core';
import { LazyLoadImageDirective } from './lazyload-image.directive';
import { Hooks } from './types';
import { IntersectionObserverHooks } from './intersection-observer-hooks';

// @dynamic
@NgModule({
  declarations: [LazyLoadImageDirective],
  exports: [LazyLoadImageDirective],
  providers: [{ provide: 'LazyLoadImageHooks', useClass: IntersectionObserverHooks }],
})
export class LazyLoadImageModule {
  static forRoot<T extends Hooks<any>, Deps extends any[]>(): ModuleWithProviders<LazyLoadImageModule>;
  static forRoot<T extends Hooks<any>, Deps extends any[]>(Hook: new () => T): ModuleWithProviders<LazyLoadImageModule>;
  static forRoot<T extends Hooks<any>, Deps extends any[]>(Hook: new (...deps: Deps) => T, deps: { [P in keyof Deps]: new (...args: any[]) => Deps[P] }): ModuleWithProviders<LazyLoadImageModule>;
  static forRoot<T extends Hooks<any>, Deps extends any[]>(Hook?: new (...deps: Deps) => T, deps?: { [P in keyof Deps]: new (...args: any[]) => Deps[P] }): ModuleWithProviders<LazyLoadImageModule> {
    return {
      ngModule: LazyLoadImageModule,
      providers: [
        {
          provide: 'LazyLoadImageHooks',
          useFactory: (...deps: Deps) => {
            if (Hook) {
              return new Hook(...deps);
            } else {
              return new IntersectionObserverHooks();
            }
          },
          deps,
        },
      ],
    };
  }
}
