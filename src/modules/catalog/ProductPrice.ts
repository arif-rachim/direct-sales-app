import {History} from "../history/History";

export interface ProductPrice{
    id : string;
    productId : string;
    effectiveFromDate : string;
    effectiveUntilDate : string;
    price : string;
    unitOfMeasurement : string;
    histories : Array<History>;
}