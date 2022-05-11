export interface IOrder {
    _id?: number;
    orderId?: number;
    date?: string;
    customer: number;
    products: object[];
    paymentStatus?: string;
    fulfillmentStatus?: string;
    total: number;
}