import {History} from "../history/History";


export interface Payment {
    id: string;
    orderId: string;
    typeOfPayment : 'CREDIT DEBIT CARD' | 'IMAGE PROOF OF PAYMENT' | 'ONLINE PAYMENT GATEWAY'
    paymentReference: string; // reference number from transaction or Bank Code
    paymentDate: string;
    billingAddress: string;
    creditCardRefCode: string;
    bankName: string;
    paymentStatus: 'CREATED' | 'VALIDATED' | 'INVALID';
    remarks: string;
    copyOfPaymentProof: string; // base64 image
    validatedByUserId : string;
    validatedDate : string;
    histories : Array<History>;
}