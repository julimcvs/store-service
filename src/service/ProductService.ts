import ProductRepository from "../repository/ProductRepository";
import {Request, Response} from "express";
import {PaginateQuery} from "../interface/PaginateQuery";
import {PaginateProjection} from "../interface/PaginateProjection";

export default class ProductService {
    private repository = new ProductRepository();

    findAllByIdIn = async (ids: number[]) => {
        return await this.repository.findAllByIdIn(ids);
    }

    findById = async (id: number, res: Response) => {
        const product = await this.repository.findById(id);
        if (product) {
            return product;
        }
        res.status(400).json({error: "Product not found."});
        throw new Error("Product not found.");
    }

    findProductById = async (req: Request, res: Response) => {
        let id: number = Number(req.params.id);
        console.log(id)
        const product: any = await this.findById(id, res);
        product.price = `R$${product.price.toFixed(2)}`;
        return res.status(200).json(product);
    }

    findPaginate = async (req: Request, res: Response) => {
        const query: any = req.query;
        this.validateQuery(query);
        const paginateQuery: PaginateQuery = new PaginateQuery();
        paginateQuery.page = Number(query.page);
        paginateQuery.rowsPerPage = Number(query.rowsPerPage);
        paginateQuery.sortDirection = query.sortDirection;
        paginateQuery.sortField = query.sortField;
        const products: PaginateProjection = await this.repository.findPaginate(paginateQuery);
        this.formatPrice(products.content);
        return res.status(200).json(products)
    }

    private formatPrice(products: any[]) {
        products.forEach(product => {
            product.price = `R$${product.price.toFixed(2)}`;
        });
    }

    private validateQuery = (query: any) => {
        query.page = query.page ?? 1;
        query.rowsPerPage = query.rowsPerPage ?? 5;
        if (query.sortDirection || query.sortField) {
            query.sortField = query.sortField ?? 'id';
            query.sortDirection = query.sortDirection ?? 'ASC'
        }
    }
}