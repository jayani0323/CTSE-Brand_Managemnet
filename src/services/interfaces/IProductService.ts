import {IProduct} from "../../interfaces/IProduct";

export interface IProductService{
    createProduct(request:IProduct):Promise<IProduct>;
    getAllProducts():Promise<IProduct[]>;
    getProductById(id:String):Promise<IProduct | Object>;
    updateProduct(id:String,product:IProduct):Promise<IProduct | Object>;
    deleteProduct(id:String):Promise<IProduct | Object>;
    updateProductStatus(id:String,status:string):Promise<IProduct | Object>;
    getProductByName(name:String):Promise<IProduct | Object>;

}