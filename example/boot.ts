import 'es6-shim';
import 'reflect-metadata';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'zone.js/dist/zone-microtask';
import 'zone.js/dist/long-stack-trace-zone';
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';

bootstrap(AppComponent);
