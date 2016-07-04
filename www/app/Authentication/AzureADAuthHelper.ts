import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import {AuthHelperBase} from './AuthHelperBase';
import { ServiceConstants } from "./ServiceConstants";

@Injectable()
export class AzureADAuthHelper extends AuthHelperBase {
    private parseQueryString = function (url: string) {
        var params = {};
        var queryString = "";
        if (url.search("#") != -1) {
            queryString = url.substring(url.search("#") + 1);

        } else {
            queryString = url.substring(url.indexOf("?") + 1);
        }
        var a = queryString.split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            params[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return params;
    }

    private params = this.parseQueryString(location.hash);

    constructor(private _serviceConstants: ServiceConstants) {
        super();
    }

    logIn(state = "/") {
        var originalURL = location.href;
        var authUrl = "https://login.microsoftonline.com/" + this._serviceConstants.tenantID +
            "/oauth2/authorize?response_type=id_token&client_id=" + this._serviceConstants.clientID +
            "&redirect_uri=" + encodeURIComponent(this._serviceConstants.redirectURL) +
            "&state=" + state + "&nonce=SomeNonce";

        var BrowserWindow = (<any>window).electron.remote.BrowserWindow;

        let authWindow = new BrowserWindow({
            width: 800, height: 600, show: false, frame: false, webPreferences: { nodeIntegration: false }
        });

        authWindow.webContents.on("did-get-redirect-request", (event: any, oldUrl: string, newUrl: string) => {
            authWindow.destroy();
            let params: any = this.parseQueryString(newUrl);
            if (params["id_token"] != null) {
                window.localStorage.setItem("id_token", params["id_token"]);

                var accessTokenUrl = "https://login.microsoftonline.com/" + this._serviceConstants.tenantID +
                    "/oauth2/authorize?response_type=token&client_id=" + this._serviceConstants.clientID +
                    "&resource=" + this._serviceConstants.graphResource +
                    "&redirect_uri=" + encodeURIComponent(this._serviceConstants.redirectURL) +
                    "&prompt=none&state=" + this.params["state"] + "&nonce=SomeNonce";

                let accessWindow = new BrowserWindow({
                    width: 800, height: 600, show: false, frame: false, webPreferences: { nodeIntegration: false }
                });

                accessWindow.on("closed", () => {
                    accessWindow = null;
                });

                accessWindow.webContents.on("did-get-redirect-request", (event: any, oldUrl: string, newUrl: string) => {
                    accessWindow.destroy();
                    let params: any = this.parseQueryString(newUrl);

                    if (params["access_token"] != null) {
                        window.localStorage.setItem("access_token", params["access_token"]);
                        (<any>window).electron.remote.getCurrentWindow().loadURL(originalURL + "index.html");
                    } else {
                        window.localStorage.removeItem("id_token");
                        window.localStorage.removeItem("access_token");
                    }
                });
                accessWindow.loadURL(accessTokenUrl);
            } else {
                window.localStorage.removeItem("id_token");
                window.localStorage.removeItem("access_token");
            }
        });

        // reset the authWindow on close
        authWindow.on("closed", () => {
            authWindow = null;
        });

        authWindow.loadURL(authUrl);
        authWindow.show();
    }

    logOut(state = "/") {
        window.localStorage.removeItem("id_token");
        window.localStorage.removeItem("access_token");
        (<any>window).electron.remote.getCurrentWindow().loadURL(location.href + "index.html");
    }

    refreshAccessToken(state = "/") {
        this.logIn(state); // force login, assume that renewToken.html didn't work which is why dev is calling this.
    }

    public getAccessToken() {
        return window.localStorage.getItem("access_token");
    }

    public ServiceConstants() {
        return this._serviceConstants;
    }
}

function error(err) {
    console.error(JSON.stringify(err, null, 4));
}