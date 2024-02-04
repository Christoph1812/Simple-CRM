export class Lead {
    id: string;
    eMail: string;
    birthDate: number;
    address: string;
    zipCode: number;
    city: string;

    constructor(id?: string, obj?: any) {
        this.id = id ? id : '';
        this.eMail = obj ? obj.eMail : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJson() {
        return {
            id: this.id,
            eMail: this.eMail,
            birthDate: this.birthDate,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
        };
    }
}