import {History} from "../history/History";

export interface Product{
    id : string;
    code : string;
    name : string;
    description : string;
    group : string;
    price : number;
    unitOfMeasurement : string;
    status : 'ACTIVE' | 'INACTIVE';
    histories : Array<History>;
}