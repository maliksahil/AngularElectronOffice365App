import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Mail, UserDetails} from './businessObjects';

import {AuthService} from './auth.service';

@Injectable()
export class MailService {
    constructor(private _http: Http, private _auth: AuthService) { }

    getMails() {
        return this._auth.getRequestPromise("/v1.0/me/messages").catch(x => {debugger;});
   }

    getMailDetails(id: string, mails: Mail[]) {
        return Observable.from(mails).filter(mail => { return mail.id === id; }).take(1);
    }
}