export class Customers {

    CustomerId !: number;
    FirstName: string = '';
    LastName: string = '';
    Email: string = '';
    Password: string = '';
    MobileNumber: number = 0;
    Address: string = '';
    Pincode: number = 0;
    IsAdmin !: boolean;


    constructor(FirstName: string, LastName: string, Email: string, Password: string, MobileNumber: number, Pincode: number, Address: string) {
        this.Email = Email;
        this.Password = Password;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.MobileNumber = MobileNumber;
        this.Address = Address;
        this.Pincode = Pincode;
    }

}

export interface response {
    status : number;
    message : string;
    data : any;
    count : number;
}