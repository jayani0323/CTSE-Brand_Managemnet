import {Logger} from "../loaders/logger";
import {OrderService} from "../services/OrderService";
import {IOrder} from "../interfaces/IOrder";
import {IOrderService} from "../services/interfaces/IOrderService";
const autoBind = require('auto-bind');

export default class OrderController {

    private logger:Logger;
    private orderService:IOrderService;

    constructor(){
        this.logger = Logger.getInstance();
        this.orderService = OrderService.getInstance();
        autoBind(this);
    }

    public async createOrder(req:any, res:any){
        this.logger.info("OrderController - createOrder()");

        if(req.body){
            await this.orderService.createOrder(req.body)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                });
        }
    }

    public async getAllOrders(req:any, res:any) {
        this.logger.info("OrderController - getAllOrders()");

        await this.orderService.getAllOrders()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getOrderById(req:any, res:any) {
        this.logger.info("OrderController - getOrderById()");
        const id = req.params.id;
        await this.orderService.getOrderById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async updateOrder(req:any, res:any) {
        this.logger.info("OrderController - updateOrder()");

        const id = req.params.id;
        const order:IOrder = req.body;
        await this.orderService.updateOrder(id ,order)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async deleteOrder(req:any, res:any) {
        this.logger.info("OrderController - deleteOrder()");
        const id = req.params.id;
        await this.orderService.deleteOrder(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }
}
