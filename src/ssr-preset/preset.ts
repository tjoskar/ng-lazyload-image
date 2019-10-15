import { of } from 'rxjs';
import { GetObservableFn, HookSet, IsVisibleFn, LoadImageFn } from '../types';
import { sharedPreset } from '../shared-preset/preset';

const isVisible: IsVisibleFn<string> = () => {
  return true;
};

const getObservable: GetObservableFn<string> = () => {
  return of('load');
};

const loadImage: LoadImageFn = ({ imagePath }) => {
  return [imagePath];
};

export const ssrPreset: HookSet<string> = Object.assign({}, sharedPreset, {
  isVisible,
  getObservable,
  loadImage
});
