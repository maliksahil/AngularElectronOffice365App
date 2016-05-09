## Angular2 Office 365 Microsoft Graph Electron App
*This sample shows how to write an O365 targeting App that uses Electron*

To use,
1. Register this app as a native client app in your AzureAD
2. update SvcConstants.ts
3. Run npm install
4. Run npm start

When the app launches, it should look like this - 
![Launch](/screenshots/launch.png)

Click the "Sign in with Office365" button, and it should look like -
![Launch](/screenshots/login.png)

Note: Since this is a multi-tenant app, and it is (as of now) registered in my tenancy, just changing the tenancy will also also ask for consent to your tenancy (so you can distribute this app via appstores etc.)

And the running app looks like this -- (yeah I know basic, and my UX sucks, but shows the concept, doesn't it?) :-)
![Launch](/screenshots/runningapp.png)

Credits:
This app uses the following component:
    1. AngularJS2 www.angularjs.org
    2. Typescript typescriptlang.org
    3. Bootstrap getbootstrap.com
    4. The SB2Admin bootstrap theme startbootstrap.com/template-overviews/sb-admin-2/