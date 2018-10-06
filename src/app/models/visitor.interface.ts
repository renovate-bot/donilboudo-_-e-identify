export class Visitor {
    id: string;
    firstName: string;
    lastName: string;
    documentNumber: string;
    comments: string;
    startDate: Date;
    endDate: Date;

    constructor(id: string,
                firstName: string, 
                lastName: string, 
                documentNumber: string, 
                comments: string, 
                startDate: any,
                endDate: any) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.documentNumber = documentNumber;
        this.comments = comments;
        this.startDate = startDate;
        if (startDate)
        {
            this.startDate = startDate.toDate();
        }
        this.endDate = endDate;

        if (endDate)
        {
            this.endDate = endDate.toDate();
        }
    }
}