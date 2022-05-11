import {Comment} from "../order/Order";
import {History} from "../history/History";

export interface Delivery {
    id : string;
    orderId : string;
    deliveryDate : string;
    deliveryUserId : string;
    receiverName : string;
    receiverPhone : string;
    receiverAddress : string;
    receiverLanLonLocation : string;
    status : 'ON DELIVERY' | 'RECEIVED BY CUSTOMER' | 'REJECTED BY CUSTOMER' | 'UNABLE TO REACH CUSTOMER';
    comments : Array<Comment>;
    histories : Array<History>;
}