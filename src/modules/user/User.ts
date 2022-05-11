import {History} from "../history/History";


export interface User {
    id : string;
    name : string;
    address : string;
    latLonLocation : string;
    phoneNo : string;
    status : 'ACTIVE' | 'INACTIVE';
    role : 'CUSTOMER' | 'MERCHANT' | 'DELIVERY';
    lastSeenDate : string;
    histories : Array<History>;
}