import {Logger} from "../loaders/logger";
import {IProduct} from "../interfaces/IProduct";
import Product from "../models/Product";

export class ProductDao{

    private logger = Logger.getInstance();
    public static instance:ProductDao = null;

    public static getInstance():ProductDao{
        if(this.instance === null){
            this.instance = new ProductDao();
        }
        return this.instance;
    }

    public async save(request:IProduct){
        this.logger.info("ProductDao - add()");
        const product = new Product(request);
        return await product.save()
            .then(data=>{
                this.logger.info(`Product ${data.name} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("ProductDao - getAll()");
        return await Product.find({}).populate('categories')
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Products Retrieved Successfully`);
                }else{
                    this.logger.info(`Products Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving products" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("ProductDao - getById()");
        return await Product.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Product Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Product ${id} Not Found`)
                    return {msg:"Product Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving product ${id} ${error.message}`);
                throw error;
            })
    }

    public async getByName(name:string){
        this.logger.info("ProductDao - getByName()");

        return await Product.find({"name":{$regex:name,$options:"i"}})
            .then((data:any)=>{
                if(data){
                    this.logger.info(`Products Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`No Product Found`)
                    return {msg:"Products Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in searching products ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,product:IProduct){
        this.logger.info("ProductDao - update()");
        return await Product.findByIdAndUpdate(id,{$set:product},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Product Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Product ${id} Not Found`);
                    return {msg:"Product Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating product ${id} ${error.message}`);
                throw error;
            })
    }

    public async updateStatus(id:string,status:string){
        this.logger.info("ProductDao - updateStatus()");
        return await Product.findByIdAndUpdate(id,{$set:{status:status}},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Product Status Updated Successfully to ${status}`);
                    return data;
                }else{
                    this.logger.info(`Product ${id} Not Found`);
                    return {msg:"Product Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating product ${id} ${error.message}`);
                throw error;
            })
    }
    public async delete(id:String){
        this.logger.info("ProductDao - delete()");
        return await Product.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Product Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Product ${id} Not Found`);
                    return {msg:"Product Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting product ${id} ${error.message}`);
                throw error;
            })
    }
}