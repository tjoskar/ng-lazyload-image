import { Observable } from "rxjs";

type IsVisibleProps<E> = {
    event: E
    element: HTMLImageElement | HTMLDivElement
    offset: number
    scrollContainer?: HTMLElement
}

type SetImageProps = {
    element: HTMLImageElement | HTMLDivElement
    imagePath: string
    defaultImagePath: string
    errorImagePath: string
    useSrcset: boolean
}

type LoadImageProps = {
    element: HTMLImageElement | HTMLDivElement
    imagePath: string
    useSrcset: boolean
}

export type Attributes<T = any> = {
    element: HTMLImageElement | HTMLDivElement
    imagePath: string
    defaultImagePath: string
    errorImagePath: string
    useSrcset: boolean
    offset: number
    scrollContainer?: HTMLElement
    scrollObservable?: Observable<T>
}

export type ObsEvent<T> = {
    event: T
    attributes: Attributes
}

export type IsVisibleFn<E> = (args: IsVisibleProps<E>, getWindow?: () => Window) => boolean
export type LoadImageFn = (args: LoadImageProps) => Observable<any>
export type SetImageFn = (args: SetImageProps) => void
export type SetupFn = (attributes: Attributes) => void
export type FinallyFn = (attributes: Attributes) => void
export type GetObservableFn<E> = (attributes: Attributes) => Observable<E>

export interface HookSet<E> {
    getObservable: GetObservableFn<E>
    isVisible: IsVisibleFn<E>
    loadImage: LoadImageFn
    setLoadedImage: SetImageFn
    setErrorImage: SetImageFn
    setup: SetupFn
    finally: FinallyFn
}

export interface ModuleOptions<T = any> extends Partial<HookSet<T>> {
    preset?: HookSet<T>
}
