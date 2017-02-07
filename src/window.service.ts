import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {

  get nativeWindow(): any {
    return _window();
  }
}

function _window(): any {
  // return the global native browser window object
  return typeof window !== 'undefined' ? window : undefined;
}
