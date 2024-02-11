import { ContactPerson } from "../interfaces/contactPerson.interface";

export class Lead {
    id: string;
    companyName: string;
    location: string;
    zipCode: string;
    contactPersons: ContactPerson[];
    priority: string;
    status: string;
    leadNotes: string[];

    constructor(id?: string, obj?: any) {
        this.id = id ? id : '';
        this.companyName = obj ? obj.companyName : '';
        this.location = obj ? obj.location : '';
        this.zipCode = obj ? obj.zipcode : '';
        this.contactPersons = obj && obj.contactPersons ? obj.contactPersons : [];
        this.priority = obj ? obj.priority : '';
        this.status = obj ? obj.status : '';
        this.leadNotes = obj && obj.leadNotes ? obj.leadNotes : [];
    }

    public toJson() {
        return {
            id: this.id,
            companyName: this.companyName,
            location: this.location,
            zipcode: this.zipCode,
            contactPersons: this.contactPersons.map(person => ({ ...person })),
            priority: this.priority,
            status: this.status,
            leadNotes: this.leadNotes
        };
    }
}