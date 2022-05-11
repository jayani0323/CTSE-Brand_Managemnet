import { IOrder } from '../../interfaces/IOrder';

export interface IOrderService {
    createOrder(request: IOrder): Promise<IOrder>;
    getAllOrders(): Promise<IOrder[]>;
    getOrderById(id: String): Promise<IOrder | Object>;
    updateOrder(id: String, order: IOrder): Promise<IOrder | Object>;
    deleteOrder(id: String): Promise<IOrder | Object>;
}
