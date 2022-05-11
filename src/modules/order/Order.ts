import {History} from "../history/History";

export interface Order {
    id : string;
    createdByUserId : string;
    createdDate : string;
    lastModifiedByUserId : string;
    lastModifiedDate : string;
    orderUserId : string;
    receiverName : string; // contact person who will receive the order
    receiverPhoneNo : string;
    receiverAddress : string;
    receiverLanLonLocation : string;
    paymentStatus : 'PAID' | 'UN-PAID';
    paymentReference : string;
    paymentDate : string;
    orderStatus : 'REQUESTED' | 'WAITING FOR DEPO' | 'DEPO REJECT' | 'WAITING FOR DELIVERY' | 'CANCELLED' | 'ON DELIVERY' | 'RETURNED TO DEPO' | 'REJECTED BY USER' | 'DELIVERED TO USER';
    depoId : string;
    deliveryName : string;
    deliveryPhoneNo : string;
    deliveryStartDate : string;
    deliveryReturnedDate : string;
    histories : Array<History>;
    comments : Array<Comment>;
    orderedItems : Array<OrderItem>;
    totalPrice : number;
}

export interface Comment {
    id :string;
    remarks : string;
    date : string;
}

export interface OrderItem {
    id : string;
    orderId : string;
    productId : string;
    quantity : string;
    price : number;
}