import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {Authenticator} from './Authentication/Authenticator';
import {AuthenticatedHttpService} from './Authentication/AuthenticatedHttpService';

@Component({
    selector: "files",
    templateUrl: "./app/files.component.html",
    directives:[ROUTER_DIRECTIVES]
})

export class FilesComponent {
    private files = [];
    constructor(private _authenticator:Authenticator, private _http:AuthenticatedHttpService) {
    }

    getFiles() {
        this._http.get("https://graph.microsoft.com/v1.0/me/drive/recent").then((files:any) => { 
            this.files = files.value; 
        })
    }
}