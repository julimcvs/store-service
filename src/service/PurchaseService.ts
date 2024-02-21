import {Response} from "express";
import {QuotationDetail} from "../entity/QuotationDetail";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";
import {Purchase} from "../entity/Purchase";
import QuotationService from "./QuotationService";
import {PurchaseDetail} from "../entity/PurchaseDetail";
import UserService from "./UserService";
import {ObjectId} from "mongodb";

export default class PurchaseService {
    private quotationService = new QuotationService();
    private userService = new UserService();

    checkout = async (req: any, res: Response) => {
        const userId = new ObjectId(req.token.id);
        const user = await this.userService.findById(userId, res);
        const body = req.body;
        let purchase = new Purchase();
        const quotationId = new ObjectId(body.quotationId);
        const quotation = await this.quotationService.findById(quotationId, res);
        const quotationDetails: QuotationDetail[] = quotation.quotationDetails;
        this.getPurchaseDetails(purchase, quotationDetails);
        purchase.purchaseDate = new Date();
        purchase.totalAmount = quotation.totalAmount;
        purchase.userId = user._id;
        quotation.status = QuotationStatusEnum.FINISHED;
        await purchase.save();
        await quotation.save();
        return res.status(200).json({
            message: 'Checkout successful!',
            id: purchase._id,
            totalAmount: `R$${purchase.totalAmount.toFixed(2)}`
        });
    }

    private getPurchaseDetails(purchase: Purchase, quotationDetails: QuotationDetail[]) {
        purchase.purchaseDetails = quotationDetails.map(detail => {
            const purchaseDetail: PurchaseDetail = new PurchaseDetail();
            purchaseDetail.productId = detail.productId;
            purchaseDetail.quantity = detail.quantity;
            purchaseDetail.subtotal = detail.subtotal;
            return purchaseDetail;
        });
    }
}