import { scrollPreset } from './scroll-preset';
import { HookSet, ModuleOptions } from './types';

export function cretateHooks<E>(options?: ModuleOptions<E>): HookSet<any> {
    if (!options) {
        return scrollPreset;
    }
    const hooks = {};
    if (options.preset) {
        Object.assign(hooks, options.preset);
    } else {
        Object.assign(hooks, scrollPreset);
    }
    Object.keys(options)
        .filter(key => key !== 'preset')
        .forEach(key => {
            hooks[key] = options[key];
        });
    return hooks as HookSet<any>;
}
