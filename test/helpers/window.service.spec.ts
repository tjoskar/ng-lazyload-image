/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowService } from './window.service';

describe('Service: Window, Angular Tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowService]
    });
  });

  it('should inject the service instance...', inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Service: Window, Isolated Tests', () => {

  let service: WindowService;

  beforeEach(() => { service = new WindowService(); });

  it('nativeWindow should be defined and equaled to "window" object', () => {
    expect(service.nativeWindow).toBeDefined();
    expect(service.nativeWindow).toBe(window);
  });
});
