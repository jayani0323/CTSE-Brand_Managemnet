import {ICustomer} from "../../interfaces/ICustomer";

export interface ICustomerService{
    createCustomer(request:ICustomer):Promise<ICustomer>;
    getAllCustomers():Promise<ICustomer[]>;
    getCustomerById(id:String):Promise<ICustomer | Object>;
    updateCustomer(id:String,product:ICustomer):Promise<ICustomer | Object>;
    deleteCustomer(id:String):Promise<ICustomer | Object>;
}