import {IBrand} from "../interfaces/IBrand";
import * as mongoose from "mongoose";
import Brand from "./Brand";
const Schema = mongoose.Schema;
const BrandSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:false,
            trim:true,
        },
        products:[{type:Schema.Types.ObjectId,required:false,ref:'products'}],
        image:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            default:"active",

        }
    }





);
export default mongoose.model<IBrand & mongoose.Document>('brands',BrandSchema)