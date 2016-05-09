export class Mail {
    constructor(public id:string, public subject: string, public bodyPreview:string, public from:any, public receivedDateTime:Date) { }
}

export class UserDetails {
    constructor(public userName: string, public userPicture: string) { }
}