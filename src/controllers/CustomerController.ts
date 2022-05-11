import {Logger} from "../loaders/logger";
import {CustomerService} from "../services/CustomerService";
import {ICustomer} from "../interfaces/ICustomer";
import {ICustomerService} from "../services/interfaces/ICustomerService";
import { ILogin } from "../interfaces/ILogin";
import { ILoginService } from "../services/interfaces/ILoginService";
import { LoginService } from "../services/LoginService";
const autoBind = require('auto-bind');
const bcrypt = require('bcrypt');

export default class CustomerController{

    private logger:Logger;
    private customerService:ICustomerService;
    private loginService: ILoginService;

    constructor(){
        this.logger = Logger.getInstance();
        this.customerService = CustomerService.getInstance();
        this.loginService = LoginService.getInstance();
        autoBind(this);
    }

    public async createCustomer(req:any,res:any){
        this.logger.info("CustomerController - createCustomer()");

        let customer: ICustomer;
        let login: ILogin;

        if (req.body) {
            customer = req.body;
            login = req.body;
        }

        if(customer){
            await this.customerService.createCustomer(customer)
                .then(async data => {
                    login._id = data._id.toString();
                    login.type = 'customer';
                    login.password = bcrypt.hashSync(login.password, 8);

                    await this.loginService.createLogin(login)
                        .then(() => {
                            res.status(200).send(data);
                        })
                        .catch(error => {
                            this.logger.error(error.message);
                            res.status(500).send({ err: error.message });
                        });
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllCustomers(req:any,res:any) {
        this.logger.info("CustomerController - getAllCustomers()");

        await this.customerService.getAllCustomers()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getCustomerById(req:any,res:any) {
        this.logger.info("CustomerController - getCustomerById()");
        const id = req.params.id;
        await this.customerService.getCustomerById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateCustomer(req:any,res:any) {
        this.logger.info("CustomerController - updateCustomer()");

        const id = req.params.id;
        const customer: ICustomer = req.body;
        const login: ILogin = req.body;

        await this.customerService.updateCustomer(id ,customer)
            .then(async data => {
                if (login.password) {
                    login.password = bcrypt.hashSync(login.password, 8);
                }

                await this.loginService.updateLogin(id, login)
                    .then(() => {
                        res.status(200).send(data);
                    })
                    .catch(error => {
                        this.logger.error(error.message);
                        res.status(500).send({ err: error.message });
                    });
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async updateCustomerPassword(req: any, res: any) {
        this.logger.info('UserController - updateUserPassword()');
        
        if (req.body) {
            const id = req.params.id;
            const email = req.body.email;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;

            await this.loginService.getLogin(email, 'customer')
                .then(data => {
                    if ('_id' in data) {
                        if (bcrypt.compareSync(currentPassword, data.password)) {
                            const login = {
                                email: email,
                                password: bcrypt.hashSync(newPassword, 8),
                                type: 'customer'
                            }

                            this.loginService.updateLogin(id, login)
                                .then(() => {
                                    res.status(200).send(data);
                                })
                                .catch(error => {
                                    this.logger.error(error.message);
                                    res.status(500).send({ err: error.message });
                                });
                        } else {
                            res.status(401).send({ msg: 'Password invalid' });
                        }
                    } else {
                        res.status(404).send(data);
                    }
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                })
        }
    }

    public async deleteCustomer(req:any,res:any) {
        this.logger.info("CustomerController - deleteCustomer()");
        const id = req.params.id;
        await this.customerService.deleteCustomer(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}