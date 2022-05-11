import {IProduct} from "../interfaces/IProduct";
import {Logger} from "../loaders/logger";
import {IProductService} from "./interfaces/IProductService";
import {ProductDao} from "../dao/ProductDao";
import { CategoryService } from "./CategoryService";
import { BrandService } from "./BrandService";

export class ProductService implements IProductService{
    private logger = Logger.getInstance();
    public static instance:ProductService = null;
    private productDao = ProductDao.getInstance();
    private categoryService = CategoryService.getInstance();
    private brandService = BrandService.getInstance();
    public static getInstance():ProductService{
        if(this.instance === null){
            this.instance = new ProductService();
        }
        return this.instance;
    }

    public async createProduct(request:IProduct):Promise<IProduct>{
        this.logger.info("Product Services - createProduct()");
        return await this.productDao.save(request)
            .then(data=>{
                data.categories.map(category => {
                    this.categoryService.addProductToCategory(category,data._id);
                })
                data.brands.map(brand => {
                    this.brandService.addProductToBrand(brand,data._id);
                })
                return data;

            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllProducts():Promise<IProduct[]>{
        this.logger.info("Product Services - getAllProducts()");
        return await this.productDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getProductById(id:String):Promise<IProduct | Object>{
        this.logger.info("Product Services - getProductById()");
        return await this.productDao.getById(id)
            .then(data=>{
                    return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getProductByName(name:string):Promise<IProduct | Object>{
        this.logger.info("Product Services - getProductByName()");
        return await this.productDao.getByName(name)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateProduct(id:String,product:IProduct):Promise<IProduct | Object>{
        this.logger.info("Product Services - updateProduct()");
        return await this.productDao.update(id,product)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateProductStatus(id:string,status:string):Promise<IProduct | Object>{
        this.logger.info("Product Services - updateProductStatus()");
        return await this.productDao.updateStatus(id,status)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async deleteProduct(id:String):Promise<IProduct | Object>{
        this.logger.info("Product Services - deleteProduct()");
        return await this.productDao.delete(id)
            .then((data:any)=> {
                data.categories.map(category => {
                    this.categoryService.removeProductFromCategory(category, data._id);
                })
                data.brands.map(brand => {
                    this.brandService.removeProductFromBrand(brand,data._id);
                })
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

}