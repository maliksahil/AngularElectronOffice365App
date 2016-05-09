import {Component, Input} from 'angular2/core';
import {Mail, UserDetails} from './businessObjects';
import {Observable} from 'rxjs/Rx';
import {MailService} from './mail.service';
import {AuthService} from './auth.service';

@Component({
    selector: 'login',
    templateUrl: './app/login.component.html'
})

export class LoginComponent {
    constructor(private _auth: AuthService) { }
    login() {
        this._auth.logIn();
    }
}