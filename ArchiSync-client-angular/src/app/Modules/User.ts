export class User {
    public userId: string;
    public name: string;
    public email: string;
    public password: string;
    public role: string;
    public token: string;


    constructor(userId:string,name: string, email: string, password: string, role: string,token: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.token = token
    }
}

