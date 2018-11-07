import { Observable } from 'rxjs';
import {
  cssClassNames,
  hasCssClassName,
  removeCssClassName,
  addCssClassName,
  isImageElement,
  isChildOfPicture,
  setSourcesToLazy,
  setImage,
  setImageAndSourcesToError,
  setImageAndSourcesToLazy,
  setImageAndSourcesToDefault,
} from '../util';
import {
  FinallyFn,
  LoadImageFn,
  SetErrorImageFn,
  SetLoadedImageFn,
  SetupFn
} from '../types';

const end: FinallyFn = ({ element }) => addCssClassName(element, cssClassNames.loaded);

export const loadImage: LoadImageFn = ({ element, useSrcset, imagePath }) => {
  let img: HTMLImageElement;
  if (isImageElement(element) && isChildOfPicture(element)) {
    const parentClone = element.parentNode.cloneNode(true) as HTMLPictureElement;
    img = parentClone.getElementsByTagName('img')[0];
    setSourcesToLazy(img);
    setImage(img, imagePath, useSrcset);
  } else {
    img = new Image();
    if (isImageElement(element) && element.sizes) {
      img.sizes = element.sizes;
    }
    if (useSrcset) {
      img.srcset = imagePath;
    } else {
      img.src = imagePath;
    }
  }

  return Observable.create(observer => {
    img.onload = () => {
      observer.next(imagePath);
      observer.complete();
    };
    img.onerror = err => {
      observer.error(null);
    };
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

  if (hasCssClassName(element, cssClassNames.loaded)) {
    removeCssClassName(element, cssClassNames.loaded);
  }
};

export const sharedPreset = {
  finally: end,
  loadImage,
  setErrorImage,
  setLoadedImage,
  setup
};
