import { bind } from '@angular/core';
import { provideRouter, RouterConfig } from '@angular/router';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {AppComponent} from './app.component'
import {FilesComponent} from './files.component';
import {HomeComponent} from './home.component';

export const CustomAppRoutes: RouterConfig = [
  { path: '', terminal: true, component: HomeComponent},
  { path: 'files', terminal: true, component: FilesComponent}
];

bootstrap(AppComponent, [provideRouter(CustomAppRoutes)]);