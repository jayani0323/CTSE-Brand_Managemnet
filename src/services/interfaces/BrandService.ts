import {IBrand} from "../interfaces/IBrand";
import {Logger} from "../loaders/logger";
import {IBrandService} from "./interfaces/IBrandService";
import {BrandDao} from "../dao/BrandDao";


export class BrandService implements IBrandService {
    private logger = Logger.getInstance();
    public static instance: BrandService = null;
    private BrandDao = BrandDao.getInstance();

    public static getInstance(): BrandService {
        if (this.instance === null) {
            this.instance = new BrandService();
        }
        return this.instance;
    }

    public async createBrand(request: IBrand): Promise<IBrand> {
        this.logger.info("Brand Services - createBrand()");

        return await this.BrandDao.save(request)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            })
    }

    public async getAllBrand(): Promise<IBrand[]> {
        this.logger.info("Brand Services - getAllBrand()");
        return await this.BrandDao.getAll()
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            })
    }

    public async getBrandById(id: String): Promise<IBrand | Object> {
        this.logger.info("Brand Services - getBrandById()");
        return await this.BrandDao.getById(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateBrand(id: String, brand: IBrand): Promise<IBrand | Object> {
        this.logger.info("Customer Services - updateCustomer()");
        return await this.BrandDao.update(id, brand)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            })
    }

    public async deleteBrand(id: String): Promise<IBrand | Object> {
        this.logger.info("Brand Services - deleteBrand()");
        return await this.BrandDao.delete(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateBrandStatus(id: string, status: string): Promise<IBrand | Object> {
        this.logger.info("Brand Services - updateBrandStatus()");
        return await this.BrandDao.updateStatus(id, status)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            })
    }

    public async addProductToBrand(id:String,productId:string):Promise<IBrand | Object>{
        this.logger.info("Brand Services - addProductToBrand()");
        return await this.BrandDao.addProduct(id,productId)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async removeProductFromBrand(id:String,productId:string):Promise<IBrand | Object>{
        this.logger.info("Brand Services - removeProductFromBrand()");
        return await this.BrandDao.removeProduct(id,productId)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}