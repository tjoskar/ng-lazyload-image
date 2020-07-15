import { InjectionToken } from '@angular/core';
import { Hooks } from './types';

export const LAZYLOAD_IMAGE_HOOKS = new InjectionToken<Hooks>('LazyLoadImageHooks');
