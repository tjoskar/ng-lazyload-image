export function getNavigator(): Navigator | undefined {
  return typeof window !== 'undefined' ? window.navigator : undefined;
}

export function isChildOfPicture(element: HTMLImageElement | HTMLDivElement): boolean {
  return Boolean(element.parentElement && element.parentElement.nodeName.toLowerCase() === 'picture');
}

export function isImageElement(element: HTMLImageElement | HTMLDivElement): element is HTMLImageElement {
  return element.nodeName.toLowerCase() === 'img';
}

export function setImage(element: HTMLImageElement | HTMLDivElement, imagePath: string, useSrcset?: boolean) {
  if (isImageElement(element)) {
    if (useSrcset && 'srcset' in element) {
      element.srcset = imagePath;
    } else {
      element.src = imagePath;
    }
  } else {
    if (imagePath) {
      element.style.backgroundImage = `url('${imagePath}')`;
    } else {
      element.style.backgroundImage = '';
    }
  }
  return element;
}

function setSources(attrName: string) {
  return (image: HTMLImageElement) => {
    const sources = image.parentElement!.getElementsByTagName('source');
    for (let i = 0; i < sources.length; i++) {
      const attrValue = sources[i].getAttribute(attrName);
      if (attrValue) {
        // Check if `srcset` is supported by the current browser
        if ('srcset' in sources[i]) {
          sources[i].srcset = attrValue;
        } else {
          sources[i].src = attrValue;
        }
      }
    }
  };
}

const setSourcesToDefault = setSources('defaultImage');
export const setSourcesToLazy = setSources('lazyLoad');
const setSourcesToError = setSources('errorImage');

function setImageAndSources(setSourcesFn: (image: HTMLImageElement) => void) {
  return (element: HTMLImageElement | HTMLDivElement, imagePath?: string, useSrcset?: boolean) => {
    if (isImageElement(element) && isChildOfPicture(element)) {
      setSourcesFn(element);
    }
    if (imagePath || !isImageElement(element)) {
      setImage(element, imagePath, useSrcset);
    }
  };
}

export const setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
export const setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
export const setImageAndSourcesToError = setImageAndSources(setSourcesToError);
