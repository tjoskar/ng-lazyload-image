import { EventEmitter } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { getNavigator } from './util/util';

export type StateChange = {
  reason: 'setup' | 'observer-emit' | 'start-loading' | 'mount-image' | 'loading-failed' | 'loading-succeeded' | 'finally';
  data?: unknown;
};

export type Attributes<T = any> = {
  /**
   * A reference to the element
   */
  element: HTMLImageElement | HTMLDivElement;
  /**
   * A URI path to the image to be lazyloaded
   */
  imagePath: string;
  /**
   * A URI path to the default image
   */
  defaultImagePath?: string;
  /**
   * A URI path to the error image
   */
  errorImagePath?: string;
  /**
   * If true, use a `srcset` for the image
   */
  useSrcset?: boolean;
  /**
   * Number of pixels to use as offset in all directions
   */
  offset: number;
  /**
   * A reference to the scroll container, if not window
   */
  scrollContainer?: HTMLElement;
  /**
   * A custom customObservable.
   */
  customObservable?: Observable<T>;
  /**
   * If true, try to decode the image before put it to the DOM
   */
  decode?: boolean;
  /**
   * If true, try to decode the image before put it to the DOM
   */
  onStateChange: EventEmitter<StateChange>;
  /**
   * A uniq id for the image
   */
  id: string;
};

export abstract class Hooks<E = any> {
  navigator?: Navigator = getNavigator();
  protected platformId!: Object;

  setPlatformId(platformId: Object) {
    this.platformId = platformId;
  }

  abstract getObservable(attributes: Attributes): Observable<E>;
  abstract isVisible(event: E, attributes: Attributes): boolean;
  abstract loadImage(attributes: Attributes): ObservableInput<string>;
  abstract setLoadedImage(imagePath: string, attributes: Attributes): void;
  abstract setErrorImage(error: Error, attributes: Attributes): void;
  abstract setup(attributes: Attributes): void;
  abstract finally(attributes: Attributes): void;
  abstract isBot(attributes: Attributes): boolean;
  abstract isDisabled(): boolean;
  abstract skipLazyLoading(attributes: Attributes): boolean;
  onDestroy(attributes: Attributes): void {}
  onAttributeChange(newAttributes: Attributes): void {}
}
