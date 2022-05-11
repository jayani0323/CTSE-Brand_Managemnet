import config from '../config/config';
import { Logger } from '../loaders/logger';
import { ILoginService } from '../services/interfaces/ILoginService';
import { LoginService } from '../services/LoginService';
import { IUserService } from '../services/interfaces/IUserService';
import { UserService } from '../services/UserService';
import { ICustomerService } from '../services/interfaces/ICustomerService';
import { CustomerService } from '../services/CustomerService';
import * as autoBind from 'auto-bind';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class LoginController {
    private logger: Logger;
    private loginService: ILoginService;
    private userService: IUserService;
    private customerService: ICustomerService;

    constructor() {
        this.logger = Logger.getInstance();
        this.loginService = LoginService.getInstance();
        this.userService = UserService.getInstance();
        this.customerService = CustomerService.getInstance();
        autoBind(this);
    }

    public async authenticate(req: any, res:any) {
        this.logger.info('LoginController - authenticate()');

        if (req.body && req.body.email) {
            const email = req.body.email;
            const password = req.body.password ? req.body.password : '';
            const type = req.body.type ? req.body.type : 'customer';

            await this.loginService.getLogin(email, type)
                .then(data => {
                    if ('_id' in data) {
                        if (bcrypt.compareSync(password, data.password)) {
                            if (type === 'user') {
                                this.userService.getUserById(data._id)
                                    .then(user => {
                                        if ('status' in user && user.status === 'active') {
                                            // Generate the JWT token
                                            const token = jwt.sign(
                                                { 
                                                    id: user._id,
                                                    role: user.role,
                                                    firstname: user.firstname,
                                                    lastname: user.lastname
                                                },
                                                config.secret,
                                                { expiresIn: 86400 }
                                            );

                                            this.sendResponse(res, 200, token, 'Authenticated');
                                        } else if ('status' in user && user.status === 'inactive' ) {
                                            this.sendResponse(res, 403, null, 'Account suspended');
                                        } else {
                                            this.sendResponse(res, 403, null, 'Account not activated');
                                        }
                                    })
                                    .catch(error => {
                                        this.sendResponse(res, 500, null, error.message);
                                    });
                            } else {
                                this.customerService.getCustomerById(data._id)
                                    .then(customer => {
                                        if ('_id' in customer) {
                                            // Generate the JWT token
                                            const token = jwt.sign(
                                                { 
                                                    id: customer._id,
                                                    role: 'customer',
                                                    firstname: customer.fname,
                                                    lastname: customer.lname
                                                },
                                                config.secret,
                                                { expiresIn: 86400 }
                                            );

                                            this.sendResponse(res, 200, token, 'Authenticated');
                                        }
                                    })
                                    .catch(error => {
                                        this.sendResponse(res, 500, null, error.message);
                                    });
                            }
                        } else {
                            this.sendResponse(res, 401, null, 'Password invalid');
                        }
                    } else {
                        res.status(404).send(data);
                    }
                });
            
        }
    }

    private sendResponse(res: any, status: Number, token: any, msg: String) {
        res.status(status).send({
            token: token,
            msg: msg
        });
    }
}
