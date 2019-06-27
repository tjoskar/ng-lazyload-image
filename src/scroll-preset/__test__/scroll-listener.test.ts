import { createRxTestScheduler } from 'marble-test';
import { spy } from 'simple-spy';
import { getScrollListener, sampleObservable } from '../scroll-listener';

describe('Scroll listener', () => {
  const consoleWarnOrg = console.warn;
  const noop = () => undefined;

  beforeEach(() => {
    console.warn = noop;
  });

  afterEach(() => {
    console.warn = consoleWarnOrg;
  });

  it('Should return an empty observable', () => {
    // Arrange
    const scheduler = createRxTestScheduler();
    const element = {
      addEventListener: null
    };
    const expected = '|';

    // Act
    const listener = getScrollListener(element);

    // Assert
    scheduler.expectObservable(listener).toBe(expected);
    scheduler.flush();
  });

  it('Should return the same observable for the same target', () => {
    // Arrange
    const element = {
      addEventListener: noop
    };

    // Act
    const listener1 = getScrollListener(element);
    const listener2 = getScrollListener(element);

    // Assert
    expect(listener1).toBe(listener2);
  });

  it('Should return diffrent observables for diffrent target', () => {
    // Arrange
    const element1 = {
      addEventListener: noop
    };
    const element2 = {
      addEventListener: noop
    };

    // Act
    const listener1 = getScrollListener(element1);
    const listener2 = getScrollListener(element2);

    // Assert
    expect(listener1).not.toBe(listener2);
  });

  it('Should pass eventname, handler and options as argument', () => {
    // Arrange
    let argumants = {
      eventName: '',
      handler: null,
      options: null
    };
    const element = {
      addEventListener(eventName, handler, options) {
        argumants = { eventName, handler, options };
      },
      removeEventListener: noop
    };

    // Act
    const subscription = getScrollListener(element).subscribe();

    // Assert
    expect(argumants.eventName).toBe('scroll');
    expect(argumants.options.passive).toBe(true);
    expect(argumants.options.capture).toBe(false);
    expect(typeof argumants.handler).toBe('function');
    subscription.unsubscribe();
  });

  it('Should call removeEventListener on unsubscribe', () => {
    // Arrange
    let argumants = {
      eventName: '',
      handler: null,
      options: null
    };
    const element = {
      addEventListener(eventName, handler, options) {
        argumants = { eventName, handler, options };
      },
      removeEventListener: spy((eventName, handler, options) => {
        expect(argumants.eventName).toBe(eventName);
        expect(argumants.options.passive).toBe(options.passive);
        expect(argumants.options.capture).toBe(options.capture);
        expect(argumants.handler).toBe(handler);
      })
    };

    // Act
    const subscription = getScrollListener(element).subscribe();
    subscription.unsubscribe();

    // Assert
    expect(element.removeEventListener.callCount).toBe(1);
  });

  it(`Should start stream with ''`, done => {
    // Arrange
    const element = {
      addEventListener: noop,
      removeEventListener: noop
    };

    // Act and assert
    const subscriber = getScrollListener(element).subscribe(d => {
      expect(d).toBe('');
      done();
    });

    subscriber.unsubscribe();
  });

  it(`Should share observable`, () => {
    // Arrange
    let subscriptionCounter = 0;
    const element = {
      addEventListener: () => {
        subscriptionCounter = subscriptionCounter + 1;
      },
      removeEventListener: noop
    };

    // Act
    const subscriber1 = getScrollListener(element).subscribe();
    const subscriber2 = getScrollListener(element).subscribe();

    // Assert
    expect(subscriptionCounter).toBe(1);
    subscriber1.unsubscribe();
    subscriber2.unsubscribe();
  });

  it(`Should sample the observable`, () => {
    // Arrange
    const scheduler = createRxTestScheduler();
    const values = { a: '', b: 'b' };
    const e1 = scheduler.createHotObservable(
      '----b-^----b----------------------|',
      values
    );
    const expected = 'a---------b-----------------|';
    // timer                                  ----------!----------!---------

    // Act
    const obs = sampleObservable(e1, scheduler);

    // Assert
    scheduler.expectObservable(obs).toBe(expected, values);
    scheduler.flush();
  });

  it(`Should emit event through the handler`, done => {
    // Arrange
    let eventHandler = null;
    const events = [];
    const element = {
      addEventListener: (eventName, handler, options) => {
        eventHandler = handler;
      },
      removeEventListener: noop
    };

    // Act and assert
    const subscriber = getScrollListener(element).subscribe(d => {
      events.push(d);
      if (events.length === 2) {
        expect(events[0]).toBe('');
        expect(events[1]).toBe('oskar');
        subscriber.unsubscribe();
        done();
      }
    });
    eventHandler('oskar');
  });
});
