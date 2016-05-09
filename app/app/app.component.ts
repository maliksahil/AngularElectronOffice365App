import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {MailListComponent} from './mailist.component'
import {MailDetailsComponent} from './maildetails.component'
import {UserDetailsComponent} from './userdetails.component'
import {LoginComponent} from './login.component';

import {Mail, UserDetails} from './businessObjects';
import {MailService} from './mail.service';

import {AuthService} from './auth.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [MailService, AuthService],
    directives: [MailListComponent, MailDetailsComponent, UserDetailsComponent, LoginComponent]
})

export class AppComponent {
    userDetails: Observable<UserDetails> = null;
    mails: Mail[] = [];
    mailDetails: Mail = null;

    private userIsAuthenticated: boolean = false;
    constructor(private _mailService: MailService, auth: AuthService) {
        if (auth.isUserAuthenticated) {
            this.userIsAuthenticated = true;
        } else {
            this.userIsAuthenticated = false;
        }
    }
    ngOnInit() {
        if (!this.userIsAuthenticated) return;
        this._mailService.getMails().then((data: any) => {            
            if (data) {
                this.mails = data.value;
                console.log(this.mails);
            } else {
                alert("An error occurred calling the Microsoft Graph: " + data);
            }
        });
    }

    selectedMail: Mail = null;
    mailSelected(mail: Mail) {
        this.selectedMail = mail;
        this._mailService.getMailDetails(this.selectedMail.id, this.mails).subscribe(x => { this.mailDetails = x; });
    }
}