import { Component, Injectable } from "angular2/core";
import {AuthService} from './auth.service';

@Component({
    selector: 'userdetails',
    templateUrl: './app/userdetails.component.html'
})

export class UserDetailsComponent {
    private displayName: string = "";
    private photo: string = "";

    constructor(private _auth: AuthService) {
        this._auth.getRequestPromise("/v1.0/me/").then((data: any) => {
            if (data) {
                this.displayName = data.displayName;
            } else {
                alert("An error occurred calling the Microsoft Graph: " + data);
            }
        });

        this._auth.getPhotoRequestPromise("/v1.0/me/photo/$value").then((data: any) => {
            if (data) {
                this.photo = data;
            } else {
                alert("An error occurred calling the Microsoft Graph: " + data);
            }
        });
    }

    public signOut() {
        this._auth.logOut();
    }
}