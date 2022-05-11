import {ICustomer} from "../interfaces/ICustomer";
import {Logger} from "../loaders/logger";
import {ICustomerService} from "./interfaces/ICustomerService";
import {CustomerDao} from "../dao/CustomerDao";

export class CustomerService implements ICustomerService{
    private logger = Logger.getInstance();
    public static instance:CustomerService = null;
    private customerDao = CustomerDao.getInstance();
    public static getInstance():CustomerService{
        if(this.instance === null){
            this.instance = new CustomerService();
        }
        return this.instance;
    }

    public async createCustomer(request:ICustomer):Promise<ICustomer>{
        this.logger.info("Customer Services - createCustomer()");

        return await this.customerDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllCustomers():Promise<ICustomer[]>{
        this.logger.info("Customer Services - getAllCustomers()");
        return await this.customerDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getCustomerById(id:String):Promise<ICustomer | Object>{
        this.logger.info("Customer Services - getCustomerById()");
        return await this.customerDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateCustomer(id:String,product:ICustomer):Promise<ICustomer | Object>{
        this.logger.info("Customer Services - updateCustomer()");
        return await this.customerDao.update(id,product)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteCustomer(id:String):Promise<ICustomer | Object>{
        this.logger.info("Customer Services - deleteCustomer()");
        return await this.customerDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}