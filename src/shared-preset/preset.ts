import { FinallyFn, IsBotFn, LoadImageFn, SetErrorImageFn, SetLoadedImageFn, SetupFn } from '../types';
import {
  addCssClassName,
  cssClassNames,
  hasCssClassName,
  isChildOfPicture,
  isImageElement,
  removeCssClassName,
  setImage,
  setImageAndSourcesToDefault,
  setImageAndSourcesToError,
  setImageAndSourcesToLazy,
  setSourcesToLazy
} from '../util';

const end: FinallyFn = ({ element }) => {
  addCssClassName(element, cssClassNames.loaded);
  removeCssClassName(element, cssClassNames.loading);
};

export const loadImage: LoadImageFn = ({ element, useSrcset, imagePath, decode }) => {
  if (!imagePath) {
    return Promise.resolve(null);
  }
  let img: HTMLImageElement;
  if (isImageElement(element) && isChildOfPicture(element)) {
    const parentClone = element.parentNode!.cloneNode(true) as HTMLPictureElement;
    img = parentClone.getElementsByTagName('img')[0];
    setSourcesToLazy(img);
    setImage(img, imagePath, useSrcset);
  } else {
    img = new Image();
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

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(imagePath);
    img.onerror = () => reject(null);
  });
};

const setErrorImage: SetErrorImageFn = ({ element, errorImagePath, useSrcset }) => {
  setImageAndSourcesToError(element, errorImagePath, useSrcset);
  addCssClassName(element, cssClassNames.failed);
};

const setLoadedImage: SetLoadedImageFn = ({ element, imagePath, useSrcset }) => {
  setImageAndSourcesToLazy(element, imagePath, useSrcset);
};

const setup: SetupFn = ({ element, defaultImagePath, useSrcset }) => {
  setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
  addCssClassName(element, cssClassNames.loading);

  if (hasCssClassName(element, cssClassNames.loaded)) {
    removeCssClassName(element, cssClassNames.loaded);
  }
};

export const isBot: IsBotFn = navigator => {
  if (navigator && navigator.userAgent) {
    return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(
      navigator.userAgent
    );
  }
  return false;
};

export const sharedPreset = {
  finally: end,
  loadImage,
  setErrorImage,
  setLoadedImage,
  setup,
  isBot
};
