# Contributing

:+1::tada: Do you want to contribute? Awesome! :tada::+1:

Contributions are most welcome! But to avoid unnecessary work, please create an issue before starting working on something new.

## Bugs 🐞

When you submit a bug report make sure to include what version of Angular and ng-lazyload-image you are using. Also include what browser the bug occurs in (if relevant), also include what version of `npm` and `node` you are using (if relevant).
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
│   ├── lazyload-image.directive.ts   // The directive declaration
│   ├── lazyload-image.module.ts      // The module declaration
│   ├── lazyload-image.ts             // Contains logic about when and how the images should be loaded
│   └── scroll-listener.ts            // Wrapper for scroll listener
├── test                              // Contains all unit tests
├── tsconfig.json
├── tslint.json
├── unit-test.*.js
├── wallaby.js
├── webpack.*.js
```

### How does it work?

The project is quite simple. When Angular detects `[lazyLoad]` on a `img` tag it will create a new instance of `LazyLoadImageDirective` ([lazyload-image.directive.ts](src/lazyload-image.directive.ts)). This will trigger `ngAfterContentInit` witch will create a new event listener (or reuse one if there is a existing one for the same scroll target). 

First of all we check if the user has defined a `defaultImage`, if so we set the `src` attribute to `defaultImage`.
For (almost) every event (we are sampling the events) we check if the image is in viewport. If so we load the image and after the image is loaded we replace the `src` attribute with the value of `[lazyLoad]`. If there was an error while loading the image we try to set the `src` attribute to the value of `errorImage`.
When that is done, we will complete the event stream and unsubscribe to the scroll listener. Which means, as soon the image is loaded the directive will stop do anything.

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
12. Give your self a high five 🖐 
