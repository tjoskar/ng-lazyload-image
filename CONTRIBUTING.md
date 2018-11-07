# Contributing

:+1::tada: Do you want to contribute? Awesome! :tada::+1:

Contributions are most welcome! But to avoid unnecessary work, please create an issue before starting working on something new.

## Bugs 🐞

When you submit a bugreport make sure to include what version of Angular and ng-lazyload-image you are using. Also include what browser the bug occurs in (if relevant), also include what version of `npm` and `node` you are using (if relevant).
Make it clear if you are using ng-lazyload-image with some other library (or framework) like ionc or material design.

Please try to describe the issue as detailed as possible. If possible, create a simple git repo or provide a [plnkr](https://plnkr.co/) to reproduce the bug. You can fork this one: https://plnkr.co/edit/5pnWgvKLCp7TIoBE69w5

## Creating a pull request

Alright, let me give you a introduction to the project.

### File structure

```
├── dist                              // Contains the build files. This will be created if you run 'npm build'
├── e2e                               // End to end (e2e) tests for the library
├── example                           // Contains some examples about how to use the library
├── index.ts                          // The endpoint for the library. This is the file the user will import
├── karma.*.js                        // Config for the unit tests
├── protractor.*.js                   // Configuration for e2e tests
├── src                               // The folder that contains all the source files
│   ├── intersection-observer-preset  // Logic for intersection observer lazy loading
│   ├── scroll-preset                 // Logic for scroll-lazy-loading
│   ├── shared-preset                 // Shared logic between the presets
│   ├── util                          // Some utility functions
│   ├── hooks-factory.ts              // Creates and builds the hooks, that will load the image
│   ├── lazyload-image.directive.ts   // The directive declaration
│   ├── lazyload-image.module.ts      // The module declaration
│   ├── lazyload-image.ts             // Contains logic about when and how the images should be loaded
│   └── types.ts                      // Contains some share types
├── tsconfig.json
├── tslint.json
├── unit-test.*.js
├── wallaby.js
└── webpack.*.js
```

### How does it work?

The project is quite simple. When the library is initialized, a set of hooks is created. These hooks contains logics about how and when the image should be loaded. The hooks contains of the following functions:
```
getObservable: GetObservableFn<E> // What we should observe
isVisible: IsVisibleFn<E> // Logic to see if the image is visible
loadImage: LoadImageFn  // Logic to load the image. It can be async or sync.
setLoadedImage: SetLoadedImageFn  // Logic to set the image in DOM
setErrorImage: SetErrorImageFn  // Logic to set the error image
setup: SetupFn  // Set up function
finally: FinallyFn  // Teardown function
```

When Angular detects `[lazyLoad]` on a `img` or `div` tag it will create a new instance of `LazyLoadImageDirective` ([lazyload-image.directive.ts](src/lazyload-image.directive.ts)). This will trigger `ngAfterContentInit` which will emit a new event on `propertyChanges$` and every time a new event is emitted; the setup-hook will be called. After that will the `getObservable`-hook be called which will emit a new event to `isVisible`. If `isVisible` returns true, `loadImage` will be called and then `setLoadedImage` and then `finally`. If something goes wrong (the image can't be loaded or some other errors) the `setErrorImage` will be loaded. 

#### Scroll preset

This is the default preset and will check if the image should be loaded on (almost (we are sampling 100 ms)) every scroll event. 

`setup` will check if the user has defined a `defaultImage`. If so, we set the `src` attribute to `defaultImage`.

`getObservable` will create a new event listener (or reuse one if there is a existing one for the same scroll target). 

Every time `getObservable` emits an event, `isVisible` will check if the images is in the viewport.

If `isVisible` returns true `loadImage` will be called which will load the image, we will also unsubscribe to the scroll events at this point. `loadImage` will return an Observer who will emit a path to the image when it is loaded.

When `loadImage` emits a URL to the image, `setLoadedImage` will be evoked how will insert the image into the DOM. 

If `loadImage` emits an error (or something else goes wrong), `setErrorImage` will be called. 

And at last will `finally` be called. At this point will the scroll event be unsubscribed, so the footprint will be minimal. However, if the attributes changes, we will restart and call `setup` and every other function once again.  

#### Intersection observer preset

This preset will check if the images is loaded by using a intersection observer. This will work like `Scroll preset`, except we will not use any scroll listener.

`setup` will check if the user has defined a `defaultImage`. If so, we set the `src` attribute to `defaultImage`.

`getObservable` will create a new event listener (or reuse one if there is an existing one for the same target). 

Every time `getObservable` emits an event, `isVisible` will check if the images is in the viewport.

If `isVisible` returns true `loadImage` will be called which will load the image, we will also unsubscribe to the scroll events at this point. `loadImage` will return an Observer who will emit a path to the image when it is loaded.

When `loadImage` emits an URL to the image, `setLoadedImage` will be evoked how will insert the image into the DOM. 

If `loadImage` emits an error (or something else goes wrong), `setErrorImage` will be called. 

And at last will `finally` be called. At this point will the image be unobserved by the intersection observer, so the footprint will be minimal. However, if the attributes changes, we will restart and call `setup` and every other function once again.  

### Project setup

1. [Fork](https://help.github.com/articles/fork-a-repo/) the repo to your account
2. Clone the new fork from your account
3. Run `npm install` (make sure you have npm version >= 5)
4. Run `npm start`
5. You should now be able to visit the example page on http://localhost:9000/
6. Do some changes
7. Create unit tests for any logic changes you are doing
8. Make sure all unit test passes by running: `npm test`
9. Commit your work
10. Push to your repo
11. [Create a pull request](https://help.github.com/articles/creating-a-pull-request/)
12. Give yourself a high five 🖐 
