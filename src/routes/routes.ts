import * as express from "express";
import BrandController from "../controllers/BrandController";
import {multerMiddleWare} from "../middleware/multer";

export default function setRoutes(app:any){

    const router = express();
    const brandControl = new BrandController();
 

    app.use("/api",router);
    //Routes
    //Brand Routes
    router.route("/brands").post(multerMiddleWare({type:"single",path:"brands"}),brandControl.createBrand);
    router.route("/brands").get(brandControl.getAllBrand);
    router.route("/brands/:id").get(brandControl.getBrandById);
    router.route("/brands/image/:name").get(brandControl.getBrandImage);
    router.route("/brands/status").put(brandControl.updateBrandStatus);
    router.route("/brands/:id").put(multerMiddleWare({type:'single', path:'brands'}),brandControl.updateBrand);
    router.route("/brands/:id").delete(brandControl.deleteBrand);
}