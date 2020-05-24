import { createRxTestScheduler } from 'marble-test';
import { spy } from 'simple-spy';
import { ScrollHooks } from '../hooks';

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
      addEventListener: null,
    };
    const expected = '|';
    const hooks = new ScrollHooks();

    // Act
    const listener = hooks.getScrollListener(element as any);

    // Assert
    scheduler.expectObservable(listener).toBe(expected);
    scheduler.flush();
  });

  it('Should return the same observable for the same target', () => {
    // Arrange
    const element = {
      addEventListener: noop,
    };
    const hooks = new ScrollHooks();

    // Act
    const listener1 = hooks.getScrollListener(element as any);
    const listener2 = hooks.getScrollListener(element as any);

    // Assert
    expect(listener1).toBe(listener2);
  });

  it('Should return diffrent observables for diffrent target', () => {
    // Arrange
    const element1 = {
      addEventListener: noop,
    };
    const element2 = {
      addEventListener: noop,
    };
    const hooks = new ScrollHooks();

    // Act
    const listener1 = hooks.getScrollListener(element1 as any);
    const listener2 = hooks.getScrollListener(element2 as any);

    // Assert
    expect(listener1).not.toBe(listener2);
  });

  it('Should pass eventname, handler and options as argument', () => {
    // Arrange
    let argumants = {
      eventName: '',
      handler: null,
      options: null,
    } as any;
    const element = {
      addEventListener(eventName: any, handler: any, options: any) {
        argumants = { eventName, handler, options };
      },
      removeEventListener: noop,
    };
    const hooks = new ScrollHooks();

    // Act
    const subscription = hooks.getScrollListener(element as any).subscribe();

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
      options: null,
    } as any;
    const element = {
      addEventListener(eventName: any, handler: any, options: any) {
        argumants = { eventName, handler, options };
      },
      removeEventListener: spy((eventName, handler, options) => {
        expect(argumants.eventName).toBe(eventName);
        expect(argumants.options.passive).toBe(options.passive);
        expect(argumants.options.capture).toBe(options.capture);
        expect(argumants.handler).toBe(handler);
      }),
    };
    const hooks = new ScrollHooks();

    // Act
    const subscription = hooks.getScrollListener(element as any).subscribe();
    subscription.unsubscribe();

    // Assert
    expect(element.removeEventListener.callCount).toBe(1);
  });

  it(`Should start stream with ''`, (done) => {
    // Arrange
    const element = {
      addEventListener: noop,
      removeEventListener: noop,
    };
    const hooks = new ScrollHooks();

    // Act and assert
    const subscriber = hooks.getScrollListener(element as any).subscribe((d) => {
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
      removeEventListener: noop,
    };
    const hooks = new ScrollHooks();

    // Act
    const subscriber1 = hooks.getScrollListener(element as any).subscribe();
    const subscriber2 = hooks.getScrollListener(element as any).subscribe();

    // Assert
    expect(subscriptionCounter).toBe(1);
    subscriber1.unsubscribe();
    subscriber2.unsubscribe();
  });

  it(`Should sample the observable`, () => {
    // Arrange
    const scheduler = createRxTestScheduler();
    const values = { a: '', b: 'b' };
    const e1 = scheduler.createHotObservable('----b-^----b----------------------|', values);
    const expected = 'a---------b-----------------|';
    // timer                                  ----------!----------!---------
    const hooks = new ScrollHooks();

    // Act
    const obs = hooks.sampleObservable(e1, scheduler);

    // Assert
    scheduler.expectObservable(obs).toBe(expected, values);
    scheduler.flush();
  });

  it(`Should emit event through the handler`, (done) => {
    // Arrange
    let eventHandler: any = null;
    const events: any[] = [];
    const element = {
      addEventListener: (eventName: any, handler: any, options: any) => {
        eventHandler = handler;
      },
      removeEventListener: noop,
    };
    const hooks = new ScrollHooks();

    // Act and assert
    const subscriber = hooks.getScrollListener(element as any).subscribe((d) => {
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
