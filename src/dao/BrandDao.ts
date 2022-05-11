import {Logger} from "../loaders/logger";
import {IBrand} from "../interfaces/IBrand";
import Brand from "../models/Brand";

export class BrandDao{

    private logger = Logger.getInstance();
    public static instance:BrandDao = null;

    public static getInstance():BrandDao{
        if(this.instance === null){
            this.instance = new BrandDao();
        }
        return this.instance;
    }

    public async save(request:IBrand){
        this.logger.info("BrandDao - save()");
        const brand = new Brand(request);
        return await brand.save()
            .then(data=>{
                this.logger.info(`Brand ${data.name} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("BrandDao - getAll()");
        return await Brand.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Brand Retrieved Successfully`);
                }else{
                    this.logger.info(`Brand Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving brands" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("BrandDao - getById()");
        return await Brand.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Brand Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Brand ${id} Not Found`)
                    return {msg:"Brand Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving brand ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,brand:IBrand){
        this.logger.info("BrandDao - update()");
        return await Brand.findByIdAndUpdate(id,{$set:brand},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Brand Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Brand ${id} Not Found`);
                    return {msg:"Brand Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Brand ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("BrandDao - delete()");
        return await Brand.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Brand Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Brand ${id} Not Found`);
                    return {msg:"Brand Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Brand ${id} ${error.message}`);
                throw error;
            })
    }

    public async updateStatus(id:string,status:string){
        this.logger.info("BrandDao - updateStatus()");
        return await Brand.findByIdAndUpdate(id,{$set:{status:status}},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Brand Status Updated Successfully to ${status}`);
                    return data;
                }else{
                    this.logger.info(`Brand ${id} Not Found`);
                    return {msg:"Brand Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Brand ${id} ${error.message}`);
                throw error;
            })
    }
    public async addProduct(id:String,productId:string){
        this.logger.info("BrandDao - addProduct()");
        return await Brand.findByIdAndUpdate(id,{$addToSet:{products:productId}},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`Product added to ${data.name} Brand Successfully`);
                    return data;
                }else{
                    this.logger.info(`Brand ${id} Not Found`);
                    return {msg:"Brand Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in adding Product to Brand ${id} ${error.message}`);
                throw error;
            })
    }
    public async removeProduct(id:String,productId:string){
        this.logger.info("BrandDao - removeProduct()");
        return await Brand.findByIdAndUpdate(id,{$pull:{products:productId}},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`Product removed from ${data.name} Brand Successfully`);
                    return data;
                }else{
                    this.logger.info(`Brand ${id} Not Found`);
                    return {msg:"Brand Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in removing Product from Brand ${id} ${error.message}`);
                throw error;
            })
    }
}