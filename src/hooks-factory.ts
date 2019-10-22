import { intersectionObserverPreset } from './intersection-observer-preset';
import { ssrPreset } from './ssr-preset';
import { HookSet, ModuleOptions } from './types';
import { getNavigator } from './util';

export function createHooks<E>(platformId: Object, options?: ModuleOptions<E>): HookSet<any> {
  const defaultPreset = intersectionObserverPreset;
  const isBot = options && options.isBot ? options.isBot : defaultPreset.isBot;

  if (isBot(getNavigator(), platformId)) {
    return Object.assign(ssrPreset, { isBot });
  } else if (!options) {
    return defaultPreset;
  }

  const hooks = {};
  if (options.preset) {
    Object.assign(hooks, options.preset);
  } else {
    Object.assign(hooks, defaultPreset);
  }
  Object.keys(options)
    .filter(key => key !== 'preset')
    .forEach(key => {
      hooks[key] = options[key];
    });
  return hooks as HookSet<any>;
}
