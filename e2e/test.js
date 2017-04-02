'use strict';

const slowScroll = () => {
    'use strict';
    let c = Math.floor((document.body.scrollHeight - 1024) / 50);
    const t = setInterval(() => {
        if (c <= 0) {
            clearInterval(t);
        }

        window.scrollBy(0, 50);
        c = c - 1;
    }, 100);
};

describe('Lazy load images', () => {

    beforeEach(() => {
        browser.manage().window().setSize(1024, 768);
        browser.get('/');
    });

    it('should not show images before it is in viewport', () => {
        // Arrange
        browser.get('/');
        const defaultImages = by.css('img[src="https://www.placecage.com/1000/1000"]');
        const loadedImages = by.css('img:not([src="https://www.placecage.com/1000/1000"])');

        browser.wait(() => {
            const deferred = protractor.promise.defer();
            setTimeout(() => deferred.fulfill(true), 1000);
            return deferred.promise;
        });

        // Assert
        expect(element.all(defaultImages).count()).toEqual(2);
        expect(element.all(loadedImages).count()).toEqual(1);

        browser.executeScript(slowScroll);

        // Wait for the scroll
        browser.wait(() => {
            const deferred = protractor.promise.defer();
            setTimeout(() => deferred.fulfill(true), 10000);
            return deferred.promise;
        });

        expect(element.all(defaultImages).count()).toEqual(0);
        expect(element.all(loadedImages).count()).toEqual(3);
    });

});
