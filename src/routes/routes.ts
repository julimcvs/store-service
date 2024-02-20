import express, {Request, Response, Router} from 'express';
import {auth} from "../middlewares/AuthUtils";
import { validateRequest } from 'typebox-express-middleware';
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";
import UserSchema from "../schema/UserSchema";

const router: Router = express.Router();

// Products
const productController = new ProductController();
router.get("/products", async (req: Request, res: Response) => {
    await productController.findPaginate(req, res);
})
router.get("/products/:id", async (req: Request, res: Response) => {
    await productController.findById(req, res);
})

// User
const userController = new UserController();
const userSchema = new UserSchema();
router.post("/auth/register", validateRequest(userSchema.register), async (req: Request, res: Response) => {
    await userController.register(req, res);
})
router.post("/auth/login", validateRequest(userSchema.login), async (req: Request, res: Response) => {
    await userController.login(req, res);
})

export default router;