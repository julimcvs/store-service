import ProductService from "../service/ProductService";
import {Request, Response} from "express";

export default class ProductController {
    private service: ProductService = new ProductService();

    findById = async (req: Request, res: Response) => {
        try {
            await this.service.findProductById(req, res);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({error: "Error getting product."});
            }
        }
    }

    findPaginate = async (req: Request, res: Response) => {
        try {
            await this.service.findPaginate(req, res);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({error: "Error listing products."});
            }
        }
    }
}