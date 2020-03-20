import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StateChange } from 'ng-lazyload-image';

@Component({
  selector: 'default-image',
  styles: [
    `
      img {
        width: 100%;
      }
      img.hidden {
        visibility: hidden;
      }
    `
  ],
  template: `
    <h3>States (see also the console):</h3>
    <p *ngFor="let state of imageStates">{{ state }}</p>
    <div [ngClass]="{ hidden: isLoading }">
      <img [defaultImage]="defaultImage" [errorImage]="errorImage" [lazyLoad]="image" (onStateChange)="onStateChange($event)" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnStateChangeComponent {
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1467932760935-519284fc87fa?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80';
  imageStates: string[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  onStateChange(state: StateChange) {
    this.imageStates.push(state.reason);
    console.log(state);
    this.cd.detectChanges();
  }
}
