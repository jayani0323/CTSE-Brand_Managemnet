import {IBrand} from "../../interfaces/IBrand";
import {IProduct} from "../../interfaces/IProduct";

export interface IBrandService{
    createBrand(request:IBrand):Promise<IBrand>;
    getAllBrand():Promise<IBrand[]>;
    getBrandById(id:String):Promise<IBrand | Object>;
    updateBrand(id:String,product:IBrand):Promise<IBrand | Object>;
    deleteBrand(id:String):Promise<IBrand | Object>;
    updateBrandStatus(id:String,status:string):Promise<IProduct | Object>;
}
