export function isWindowDefined() {
    return typeof window !== 'undefined';
}

export function removeCssClassName(element: HTMLImageElement | HTMLDivElement, cssClassName: string) {
    element.className = element.className.replace(cssClassName, '');
}

export function addCssClassName(element: HTMLImageElement | HTMLDivElement, cssClassName: string) {
    if (!element.className.includes(cssClassName)) {
        element.className += ` ${cssClassName}`;
    }
}

export function hasCssClassName(element: HTMLImageElement | HTMLDivElement, cssClassName: string) {
    return element.className && element.className.includes(cssClassName);
}
