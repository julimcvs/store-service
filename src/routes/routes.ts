import express, {Request, Response, Router} from 'express';
import {auth} from "../middlewares/AuthUtils";
import { validateRequest } from 'typebox-express-middleware';
import ProductController from "../controller/ProductController";

const router: Router = express.Router();

// Products
const productController = new ProductController();
router.get("/products", async (req: Request, res: Response) => {
    await productController.findPaginate(req, res);
})
router.get("/products/:id", async (req: Request, res: Response) => {
    await productController.findById(req, res);
})

export default router;