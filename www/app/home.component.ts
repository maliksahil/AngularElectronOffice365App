import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {Authenticator} from './Authentication/Authenticator';
import {AuthenticatedHttpService} from './Authentication/AuthenticatedHttpService';

@Component({
    selector: "home",
    templateUrl: "./app/home.component.html",
    directives:[ROUTER_DIRECTIVES]
})

export class HomeComponent {
    private isUserAuthenticated: boolean = false;
    constructor(private _authenticator:Authenticator, private _http:AuthenticatedHttpService) {
        this.isUserAuthenticated = _authenticator.isUserAuthenticated();
    }
}