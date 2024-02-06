export class Customer {
    id: string;
    firstName: string;
    lastName: string;
    eMail: string;
    birthDate: number;
    address: string;
    zipCode: number;
    city: string;

    constructor(id?: string, obj?: any) {
        this.id = id ? id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.eMail = obj ? obj.eMail : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJson() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            eMail: this.eMail,
            birthDate: this.birthDate,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
        };
    }
}