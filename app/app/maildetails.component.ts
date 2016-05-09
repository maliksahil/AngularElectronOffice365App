import {Component, Input} from 'angular2/core';
import {Mail, UserDetails} from './businessObjects';
import {Observable} from 'rxjs/Rx';
import {MailService} from './mail.service';

@Component({
    selector: 'maildetails',
    templateUrl:'./app/maildetails.component.html'
})

export class MailDetailsComponent { 
    @Input() mailDetails:Mail[];
    constructor(private _mailService:MailService) {}
}