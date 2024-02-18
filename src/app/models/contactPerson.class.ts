export class ContactPerson {
    position: string
    name: string;
    email: string;
    phoneNumber: string;

    constructor(obj?: any) {
        this.position = obj ? obj.positon : '';
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.phoneNumber = obj ? obj.phoneNumber : '';

    }

}