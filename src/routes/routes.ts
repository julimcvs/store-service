import express, {Request, Response, Router} from 'express';
import {auth} from "../middlewares/AuthUtils";
import { validateRequest } from 'typebox-express-middleware';
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";
import UserSchema from "../schema/UserSchema";
import QuotationController from "../controller/QuotationController";
import QuotationSchema from "../schema/QuotationSchema";
import PurchaseController from "../controller/PurchaseController";
import PurchaseSchema from "../schema/PurchaseSchema";

const router: Router = express.Router();

// Products
const productController = new ProductController();
router.get("/products", async (req: Request, res: Response) => {
    await productController.findPaginate(req, res);
})
router.get("/products/:id", async (req: Request, res: Response) => {
    await productController.findById(req, res);
})

// Purchase
const purchaseController = new PurchaseController();
const purchaseSchema = new PurchaseSchema();
router.post("/purchase/checkout", [auth, validateRequest(purchaseSchema.checkout)], async (req: Request, res: Response) => {
    await purchaseController.checkout(req, res);
})

// Quotation
const quotationController = new QuotationController();
const quotationSchema = new QuotationSchema();
router.post("/quotation", validateRequest(quotationSchema.quotation), async (req: Request, res: Response) => {
    await quotationController.quotation(req, res);
})

router.post("/quotation/add", validateRequest(quotationSchema.addItem), async (req: Request, res: Response) => {
    await quotationController.addItem(req, res);
})

router.get("/quotation/:id", async (req: Request, res: Response) => {
    await quotationController.findQuotationById(req, res);
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