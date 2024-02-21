import {Request, Response} from "express";
import QuotationService from "../service/QuotationService";

export default class QuotationController {
    private service: QuotationService = new QuotationService();

    addItem = async (req: Request, res: Response) => {
        try {
            await this.service.addItem(req, res);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({error: "Error adding item to quotation."})
            }
        }

    }

    findQuotationById = async (req: Request, res: Response) => {
        try {
            await this.service.findQuotationById(req, res);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({error: "Error getting quotation."})
            }
        }

    }

    quotation = async (req: Request, res: Response) => {
        try {
            await this.service.quotation(req, res);
        } catch (error: any) {
            console.error(error.stack);
            if (!res.headersSent) {
                res.status(500).json({error: "Quotation error."})
            }
        }
    }
}