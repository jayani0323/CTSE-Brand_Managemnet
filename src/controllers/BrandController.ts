import {Logger} from "../loaders/logger";
import {BrandService} from "../services/BrandService";
import {IBrand} from "../interfaces/IBrand";
import {IBrandService} from "../services/interfaces/IBrandService";

const autoBind = require('auto-bind');
import * as fs from "fs";
import mime = require("mime");


export default class BrandController{

    private logger:Logger;
    private brandService:IBrandService;

    constructor(){
        this.logger = Logger.getInstance();
        this.brandService = BrandService.getInstance();
        autoBind(this);
    }

    public async createBrand(req:any,res:any){
        this.logger.info("BrandController - createBrand()");

            if(req.body) {
                let image = "";
                const brand:IBrand = JSON.parse(req.body.data);

                if (req.file) {
                    image = req.file.filename;
                    brand.image = image;
                }
            await this.brandService.createBrand(brand)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }else {
                res.status(404);
            }
    }
    public async getAllBrand(req:any,res:any) {
        this.logger.info("BrandController - getAllBrand()");

        await this.brandService.getAllBrand()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getBrandById(req:any,res:any) {
        this.logger.info("BrandController - getBrandById()");
        const id = req.params.id;
        await this.brandService.getBrandById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateBrand(req:any,res:any) {
        this.logger.info("BrandController - updateBrand()");

        const id = req.params.id;

        if(req.body) {
            let image = "";
            const brand: IBrand = JSON.parse(req.body.data);

            if (req.file) {
                image = req.file.filename;
                brand.image = image;
            }
            await this.brandService.updateBrand(id, brand)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err: error.message});
                })
        }else {
            res.status(404);
        }
    }

    public async deleteBrand(req:any,res:any) {
        this.logger.info("BrandController - deleteBrand()");
        const id = req.params.id;
        await this.brandService.deleteBrand(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getBrandImage(req:any,res:any){
        this.logger.info("BrandController - getBrandImage()");

        // Get filename from the parameter
        const filename = req.params.name;

        // Define image path
        const path = `./public/uploads/images/brands/${filename}`;
        // Create a mime-type and set it as the content type in the response header
        const mimeType = mime.lookup(path);

        res.contentType(mimeType)


        // This line opens the file as a readable stream
        let readStream = fs.createReadStream(path);

        // This will wait until we know the readable stream is actually valid before piping
        readStream.on('open', function () {
            // This just pipes the read stream to the response object (which goes to the client)
            readStream.pipe(res);
        });

        // This catches any errors that happen while creating the readable stream (usually invalid names)
        readStream.on('error', function(err) {
            Logger.getInstance().error(`Image ${filename} not found`)
            res.status(404).send(err);
        });
    }

    public async updateBrandStatus(req:any,res:any) {
        this.logger.info("BrandController - updateBrandStatus()");
        const id = req.body.id;
        const status = req.body.status;
        await this.brandService.updateBrandStatus(id,status)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
