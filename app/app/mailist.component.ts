import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Mail, UserDetails} from './businessObjects';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'mailist',
    templateUrl:'./app/maillist.component.html'
})

export class MailListComponent {
    @Input() mails:Mail[]; 
    @Output() mailSelected = new EventEmitter<Mail>();
    
    selectedMail:Mail = null;
    selectMail(mail:Mail) {
        this.selectedMail = mail;
        this.mailSelected.emit(mail); 
    }
}