import {Logger} from "../loaders/logger";
import {ICustomer} from "../interfaces/ICustomer";
import Customer from "../models/Customer";

export class CustomerDao{

    private logger = Logger.getInstance();
    public static instance:CustomerDao = null;

    public static getInstance():CustomerDao{
        if(this.instance === null){
            this.instance = new CustomerDao();
        }
        return this.instance;
    }

    public async save(request:ICustomer){
        this.logger.info("CustomerDao - add()");
        const customer = new Customer(request);
        return await customer.save()
            .then(data=>{
                this.logger.info(`Customer ${data.fname} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting customer" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("CustomerDao - getAll()");
        return await Customer.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Customers Retrieved Successfully`);
                }else{
                    this.logger.info(`Customers Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving customers" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("CustomerDao - getById()");
        return await Customer.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.fname} Customer Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Customer ${id} Not Found`)
                    return {msg:"Customer Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving customer ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,customer:ICustomer){
        this.logger.info("CustomerDao - update()");
        return await Customer.findByIdAndUpdate(id,{$set:customer},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.fname} Customer Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Customer ${id} Not Found`);
                    return {msg:"Customer Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating customer ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("CustomerDao - delete()");
        return await Customer.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.fname} Customer Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Customer ${id} Not Found`);
                    return {msg:"Customer Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting customer ${id} ${error.message}`);
                throw error;
            })
    }

}