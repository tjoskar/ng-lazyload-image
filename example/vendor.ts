// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';

import { fromEvent, merge, of } from 'rxjs';
import { filter, finalize, map, sampleTime, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
