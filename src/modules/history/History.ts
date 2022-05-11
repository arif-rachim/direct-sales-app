
export interface History {
    id : string;
    entityId : string;
    entityType : 'Product' | 'ProductPrice' | 'Delivery' | 'Depo' | 'Order' | 'Payment' | 'User'
    remarks : string;
    date : string;
}