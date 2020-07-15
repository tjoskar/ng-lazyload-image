import { isPlatformServer } from '@angular/common';
import { ObservableInput } from 'rxjs';
import { Attributes, Hooks } from '../types';
import { addCssClassName, cssClassNames, hasCssClassName, removeCssClassName } from '../util/css.util';
import { isChildOfPicture, isImageElement, setImage, setImageAndSourcesToDefault, setImageAndSourcesToError, setImageAndSourcesToLazy, setSourcesToLazy } from '../util/util';

export abstract class SharedHooks<E> extends Hooks<E> {
  setup(attributes: Attributes): void {
    setImageAndSourcesToDefault(attributes.element, attributes.defaultImagePath, attributes.useSrcset);
    addCssClassName(attributes.element, cssClassNames.loading);

    if (hasCssClassName(attributes.element, cssClassNames.loaded)) {
      removeCssClassName(attributes.element, cssClassNames.loaded);
    }
  }

  finally(attributes: Attributes): void {
    addCssClassName(attributes.element, cssClassNames.loaded);
    removeCssClassName(attributes.element, cssClassNames.loading);
  }

  loadImage(attributes: Attributes): ObservableInput<string> {
    if (this.skipLazyLoading()) {
      // Set the image right away for bots for better SEO
      return [attributes.imagePath];
    }
    const { element, useSrcset, imagePath, decode } = attributes;
    let img: HTMLImageElement;
    if (isImageElement(element) && isChildOfPicture(element)) {
      const parentClone = element.parentNode!.cloneNode(true) as HTMLPictureElement;
      img = parentClone.getElementsByTagName('img')[0];
      setSourcesToLazy(img);
      setImage(img, imagePath, useSrcset);
    } else {
      img = new Image();
      if (isImageElement(element) && element.referrerPolicy) {
        img.referrerPolicy = element.referrerPolicy;
      }
      if (isImageElement(element) && element.sizes) {
        img.sizes = element.sizes;
      }
      if (useSrcset && 'srcset' in img) {
        img.srcset = imagePath;
      } else {
        img.src = imagePath;
      }
    }

    if (decode && img.decode) {
      return img.decode().then(() => imagePath);
    }

    return new Promise<string>((resolve, reject) => {
      img.onload = () => resolve(imagePath);
      img.onerror = () => reject(null);
    });
  }

  setErrorImage(error: Error, attributes: Attributes): void {
    const { element, useSrcset, errorImagePath } = attributes;
    setImageAndSourcesToError(element, errorImagePath, useSrcset);
    addCssClassName(element, cssClassNames.failed);
  }

  setLoadedImage(imagePath: string, attributes: Attributes): void {
    const { element, useSrcset } = attributes;
    setImageAndSourcesToLazy(element, imagePath, useSrcset);
  }

  isDisabled(): boolean {
    // Disable if SSR and the user isn't a bot
    return isPlatformServer(this.platformId) && !this.isBot();
  }

  skipLazyLoading(): boolean {
    return this.isBot();
  }

  isBot(): boolean {
    if (this.navigator?.userAgent) {
      return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(
        this.navigator.userAgent
      );
    }
    return false;
  }
}
