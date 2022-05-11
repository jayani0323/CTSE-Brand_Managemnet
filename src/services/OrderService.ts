import { IOrder } from '../interfaces/IOrder';
import { Logger } from '../loaders/logger';
import { IOrderService } from './interfaces/IOrderService';
import { OrderDao } from '../dao/OrderDao';

export class OrderService implements IOrderService {
    private logger = Logger.getInstance();
    public static instance: OrderService = null;
    private orderDao = OrderDao.getInstance();

    public static getInstance(): OrderService {
        if (this.instance === null) {
            this.instance = new OrderService();
        }

        return this.instance;
    }

    public async createOrder(request: IOrder): Promise<IOrder> {
        this.logger.info('OrderService - createOrder()');

        return await this.orderDao.save(request)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getAllOrders(): Promise<IOrder[]> {
        this.logger.info('OrderService - getAllOrders()');

        return await this.orderDao.getAll()
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getOrderById(id: String): Promise<IOrder | Object> {
        this.logger.info('OrderService - getOrderById()');

        return await this.orderDao.getById(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async updateOrder(id: String, order: IOrder): Promise<IOrder | Object> {
        this.logger.info('OrderService - updateOrder()');

        return await this.orderDao.update(id, order)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async deleteOrder(id: String): Promise<IOrder | Object> {
        this.logger.info('OrderService - deleteOrder()');

        return await this.orderDao.delete(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }
}
