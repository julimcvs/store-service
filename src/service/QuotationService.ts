import {Request, Response} from "express";
import {Quotation} from "../entity/Quotation";
import QuotationRepository from "../repository/QuotationRepository";
import ProductService from "./ProductService";
import {QuotationDetail} from "../entity/QuotationDetail";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";
import {Product} from "../entity/Product";
import {ObjectId} from "mongodb";

export default class QuotationService {
    private repository = new QuotationRepository();
    private productService = new ProductService();

    addItem = async (req: Request, res: Response) => {
        const body = req.body;
        const product = body.product;
        let quotation = new Quotation();
        if (body.id) {
            const id = new ObjectId(body.id);
            quotation = await this.findById(id, res);
        }
        const savedProduct: Product = await this.productService.findById(product.id, res);
        const quotationDetail: QuotationDetail = this.getQuotationDetail(product, savedProduct);
        let quotationDetails: QuotationDetail[] = await this.getQuotationDetails(quotation, product, quotationDetail);
        quotation.quotationDetails = quotationDetails;
        quotation.status = QuotationStatusEnum.STARTED;
        quotation.totalAmount = quotationDetails
            .map((detail) => detail.subtotal)
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        await quotation.save();
        return res.status(200).json({
            message: 'Item added successfully!',
            id: quotation._id,
            totalAmount: `R$${quotation.totalAmount.toFixed(2)}`
        });
    }

    async findQuotationById(req: Request, res: Response) {
        const id = new ObjectId(req.params.id);
        const quotation: any = await this.findById(id, res);
        quotation.totalAmount = `R$${quotation.totalAmount.toFixed(2)}`;
        return res.status(200).json(quotation);
    }

    async findById(id: ObjectId, res: Response) {
        const quotation = await this.repository.findById(id);
        if (quotation) {
            return quotation;
        }
        res.status(400).json({error: 'Quotation not found.'});
        throw new Error('Quotation not found.')
    }

    quotation = async (req: Request, res: Response) => {
        const body = req.body;
        const products = body.products;
        let quotation = new Quotation();
        if (body.id) {
            quotation = await this.findById(body.id, res);
        }
        const productsIds = products.map((product: any) => product.id);
        const savedProducts = await this.productService.findAllByIdIn(productsIds);
        const quotationDetails: QuotationDetail[] = savedProducts.map(savedProduct => {
            const product = products.find((product: any) => product.id === savedProduct.id);
            return this.getQuotationDetail(product, savedProduct);
        })
        quotation.quotationDetails = quotationDetails;
        quotation.status = QuotationStatusEnum.STARTED;
        quotation.totalAmount = quotationDetails
            .map((detail) => detail.subtotal)
            .reduce((previousValue, currentValue) => previousValue + currentValue);
        await quotation.save();
        return res.status(200).json({
            message: 'Quotation successful!',
            id: quotation._id,
            totalAmount: `R$${quotation.totalAmount.toFixed(2)}`
        });
    }

    private getQuotationDetail(product: any, savedProduct: Product) {
        const quotationDetail: QuotationDetail = new QuotationDetail();
        quotationDetail.productId = product.id;
        quotationDetail.quantity = product.quantity;
        quotationDetail.subtotal = (quotationDetail.quantity * savedProduct.price);
        return quotationDetail;
    }

    private async getQuotationDetails(quotation: Quotation, product: any, quotationDetail: QuotationDetail) {
        let quotationDetails = quotation.quotationDetails ?? [];
        const index = quotationDetails.findIndex(detail => detail.productId === product.id);
        if (index !== -1) {
            quotationDetails.splice(index, 1);
        }
        quotationDetails.push(quotationDetail);
        return quotationDetails;
    }
}