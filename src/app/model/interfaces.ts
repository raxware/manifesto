export interface itemData {
    thingID?: string;
    thingType: string;
    quantity: number;
    thingDescription: string;
    thingStatus: string;
    onLoan: boolean;
    borrowerName: string;
    loanDate: string;
    defaulter: boolean;
}