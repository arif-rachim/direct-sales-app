import {History} from "../history/History";

export interface Depo{
    id : string;
    name : string;
    description : string;
    address : string;
    region : string;
    latLonLocation : string;
    status : 'ACTIVE' | 'INACTIVE';
    phoneNo : string;
    contactPerson : string;
    histories : Array<History>;
}