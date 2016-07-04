import { Component, provide } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {Http, HTTP_PROVIDERS, ConnectionBackend} from '@angular/http';

import {ServiceConstants} from './Authentication/ServiceConstants';
import {Authenticator} from './Authentication/Authenticator';
import {AuthenticatedHttpService} from './Authentication/AuthenticatedHttpService';
import {AzureADAuthHelper} from './Authentication/AzureADAuthHelper';

import {HomeComponent} from './home.component';
import {FilesComponent} from './files.component';

var azureADAuthHelper = new AzureADAuthHelper(new ServiceConstants("19d25c72-6c48-4019-a7e1-6faf56f612c8", "winsmartsdev.onmicrosoft.com", "http://localhost:3000"));
var authenticator = new Authenticator(azureADAuthHelper);
function authenticatorFactory() {
    return authenticator;
}

@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    precompile:[FilesComponent],
    providers: [Http, HTTP_PROVIDERS, AuthenticatedHttpService,
        provide(Authenticator, { useFactory: authenticatorFactory })],
})

export class AppComponent {
    private isUserAuthenticated: boolean = false;

    constructor(
        private _authenticator: Authenticator,
        private _authenticatedHttpService: AuthenticatedHttpService) {
        this.isUserAuthenticated = _authenticator.isUserAuthenticated();
    }

    logIn() {
        var promise = this._authenticator.logIn(window.location.href);
    }

    logOut() {
        var promise = this._authenticator.logOut("/");
    }

    get userName() {
        return this._authenticator.userName;
    }
}