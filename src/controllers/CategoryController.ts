import {Logger} from "../loaders/logger";
import {CategoryService} from "../services/CategoryService";
import {ICategory} from "../interfaces/ICategory";
import {ICategoryService} from "../services/interfaces/ICategoryService";
const autoBind = require('auto-bind');
import * as fs from "fs";
import mime = require("mime");

export default class CategoryController{

    private logger:Logger;
    private categoryService:ICategoryService;

    constructor(){
        this.logger = Logger.getInstance();
        this.categoryService = CategoryService.getInstance();
        autoBind(this);
    }

    public async createCategory(req:any,res:any){
        this.logger.info("CategoryController - createCategory()");

        if(req.body){

            let image = "";
            if (req.file){
                image = req.file.filename;
            }
            const category:ICategory = JSON.parse(req.body.data);
            category.image = image;
            await this.categoryService.createCategory(category)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllCategory(req:any,res:any) {
        this.logger.info("CategoryController - getAllCategory()");

        await this.categoryService.getAllCategory()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getCategoryById(req:any,res:any) {
        this.logger.info("CategoryController - getCategoryById()");
        const id = req.params.id;
        await this.categoryService.getCategoryById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getProductByCategory(req:any,res:any) {
        this.logger.info("CategoryController - getProductByCategory()");
        const name = req.params.name;
        await this.categoryService.getProductsByCategory(name)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateCategory(req:any,res:any) {
        this.logger.info("CategoryController - updateCategory()");
        const id = req.params.id;

        if(req.body) {
            let image = "";
            const category: ICategory = JSON.parse(req.body.data);
            if (req.file) {
                image = req.file.filename;
                category.image = image;
            }
            await this.categoryService.updateCategory(id, category)
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

    public async deleteCategory(req:any,res:any) {
        this.logger.info("CategoryController - deleteCategory()");
        const id = req.params.id;
        await this.categoryService.deleteCategory(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getCategoryImage(req:any,res:any){
        this.logger.info("CategoryController - getCategoryImage()");

        // Get filename from the parameter
        const filename = req.params.name;

        // Define image path
        const path = `./public/uploads/images/category/${filename}`;
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
    public async updateCategoryStatus(req:any,res:any) {
        this.logger.info("CategoryController - updateCategoryStatus()");
        const id = req.body.id;
        const status = req.body.status;
        await this.categoryService.updateCategoryStatus(id,status)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
