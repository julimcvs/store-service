import {Request, Response} from "express";
import PurchaseService from "../service/PurchaseService";

export default class PurchaseController {
    private service: PurchaseService = new PurchaseService();

    checkout = async (req: Request, res: Response) => {
        try {
            await this.service.checkout(req, res);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({error: "Checkout error."})
            }
        }
    }

}