import * as express from "express";
import ProductController from "../controllers/ProductController";
import CustomerController from "../controllers/CustomerController";
import UserController from '../controllers/UserController';
import CategoryController from "../controllers/CategoryController";
import BrandController from "../controllers/BrandController";
import LoginController from '../controllers/LoginController';
import OrderController from '../controllers/OrderController';
import {multerMiddleWare} from "../middleware/multer";

export default function setRoutes(app:any){

    const router = express();
    const productControl = new ProductController();
    const customerControl = new CustomerController();
    const userControl = new UserController();
    const categoryControl = new CategoryController();
    const brandControl = new BrandController();
    const loginControl = new LoginController();
    const orderControl = new OrderController();


    app.use("/api",router);

    //Routes
    //Product Routes
    router.route("/products").post(multerMiddleWare({type:"multiple",path:"products"}),productControl.createProduct);
    router.route("/products").get(productControl.getAllProducts);
    router.route("/products/:id").get(productControl.getProductById);
    router.route("/products/search/:name").get(productControl.getProductByName);
    router.route("/products/image/:name").get(productControl.getProductImage);
    router.route("/products/status").put(productControl.updateProductStatus);
    router.route("/products/:id").put(multerMiddleWare({type:"multiple",path:"products"}),productControl.updateProduct);
    router.route("/products/:id").delete(productControl.deleteProduct);


  // User Routes
    router.route('/users').post(multerMiddleWare({type:'single', path:'user'}), userControl.createUser);
    router.route('/users').get(userControl.getAllUsers);
    router.route('/users/:id').get(userControl.getUserById);
    router.route("/users/status").put(userControl.updateUserStatus);
    router.route('/users/:id').put(multerMiddleWare({type:'single', path:'user'}), userControl.updateUser);
    router.route('/users/:id').delete(userControl.deleteUser);
    router.route('/users/image/:name').get(userControl.getUserAvatar);
    router.route('/users/change-password/:id').put(userControl.updateUserPassword);

    //Customer Routes
    router.route("/customers").post(customerControl.createCustomer);
    router.route("/customers").get(customerControl.getAllCustomers);
    router.route("/customers/:id").get(customerControl.getCustomerById);
    router.route("/customers/:id").put(customerControl.updateCustomer);
    router.route("/customers/:id").delete(customerControl.deleteCustomer);
    router.route('/customers/change-password/:id').put(customerControl.updateCustomerPassword);

    //Category Routes
    router.route("/category").post(multerMiddleWare({type:"single",path:"category"}),categoryControl.createCategory);
    router.route("/category").get(categoryControl.getAllCategory);
    router.route("/category/image/:name").get(categoryControl.getCategoryImage);
    router.route("/category/products/:name").get(categoryControl.getProductByCategory);
    router.route("/category/status").put(categoryControl.updateCategoryStatus);
    router.route("/category/:id").get(categoryControl.getCategoryById);
    router.route("/category/:id").put(multerMiddleWare({type:'single', path:'category'}),categoryControl.updateCategory);
    router.route("/category/:id").delete(categoryControl.deleteCategory);

    //Brand Routes
    router.route("/brands").post(multerMiddleWare({type:"single",path:"brands"}),brandControl.createBrand);
    router.route("/brands").get(brandControl.getAllBrand);
    router.route("/brands/:id").get(brandControl.getBrandById);
    router.route("/brands/image/:name").get(brandControl.getBrandImage);
    router.route("/brands/status").put(brandControl.updateBrandStatus);
    router.route("/brands/:id").put(multerMiddleWare({type:'single', path:'brands'}),brandControl.updateBrand);
    router.route("/brands/:id").delete(brandControl.deleteBrand);

    // Login Routes
    router.route('/auth/login').post(loginControl.authenticate);

    // Order Routes
    router.route('/orders').post(orderControl.createOrder);
    router.route('/orders').get(orderControl.getAllOrders);
    router.route('/orders/:id').get(orderControl.getOrderById);
    router.route('/orders/:id').put(orderControl.updateOrder);
    router.route('/orders/:id').delete(orderControl.deleteOrder);
}