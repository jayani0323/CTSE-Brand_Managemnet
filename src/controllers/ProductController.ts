import {Logger} from "../loaders/logger";
import {ProductService} from "../services/ProductService";
import {IProduct} from "../interfaces/IProduct";
import {IProductService} from "../services/interfaces/IProductService";
import * as fs from "fs";
import mime = require("mime");
const autoBind = require('auto-bind');


export default class ProductController{

    private logger:Logger;
    private productService:IProductService;
    private DIR = 'public/uploads/images/users';
    constructor(){
        this.logger = Logger.getInstance();
        this.productService = ProductService.getInstance();
        autoBind(this);
    }



    public async createProduct(req:any,res:any){
        this.logger.info("ProductController - createProduct()");

        if(req.body){
            let images =[];
            //Check if files exist
            if(req.files){
                //Get the image names from the file
                req.files.map(file => {
                    images.push(file.filename);
                })
            }

            const product:IProduct = JSON.parse(req.body.data);
            product.images = images;
            await this.productService.createProduct(product)
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
    public async getAllProducts(req:any,res:any) {
        this.logger.info("ProductController - getAllProducts()");

        await this.productService.getAllProducts()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getProductById(req:any,res:any) {
        this.logger.info("ProductController - getProductById()");
        const id = req.params.id;
        await this.productService.getProductById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async getProductByName(req:any,res:any) {
        this.logger.info("ProductController - getProductByName()");
        const name = req.params.name;
        await this.productService.getProductByName(name)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateProduct(req:any,res:any) {
        this.logger.info("ProductController - updateProduct()");

        const id = req.params.id;

        if(req.body) {
            let images = [];
            const product: IProduct = JSON.parse(req.body.data);

            //Check if there are old images
            product.images.map(image => {
                if (typeof image == "string") {
                    images.push(image);
                }
            })

            //Check if files exist
            if (req.files) {
                //Get the image names from the file
                req.files.map(file => {
                    images.push(file.filename);
                })
            }
            product.images = images;
            console.log(product);

            await this.productService.updateProduct(id, product)
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

    public async updateProductStatus(req:any,res:any) {
        this.logger.info("ProductController - updateProductStatus()");
        const id = req.body.id;
        const status = req.body.status;
        await this.productService.updateProductStatus(id,status)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async deleteProduct(req:any,res:any) {
        this.logger.info("ProductController - deleteProduct()");
        const id = req.params.id;
        await this.productService.deleteProduct(id)
            .then(data => {

                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getProductImage(req:any,res:any){
        this.logger.info("ProductController - getProductImage()");

        // Get filename from the parameter
        const filename = req.params.name;

        // Define image path
        const path = `./public/uploads/images/products/${filename}`;
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
}
