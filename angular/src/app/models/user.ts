
export interface UserInterface {
    data:Registration[];
    count : number
}

export class Registration {
    _id !:string;
    name: string;
    email: string;
    password: string;
    isAdmin:boolean = false;

    constructor(name: string = '', email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class User {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}