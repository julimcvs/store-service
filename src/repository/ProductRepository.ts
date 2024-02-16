import {Product} from "../entity/Product";
import {PaginateQuery} from "../interface/PaginateQuery";
import {PaginateProjection} from "../interface/PaginateProjection";
import {AppDataSource} from "../data-source";

export default class ProductRepository {
    findPaginate = async (pagination: PaginateQuery): Promise<PaginateProjection> => {
        const [products, count] = await AppDataSource.getMongoRepository(Product).findAndCount({
            order: {[pagination.sortField ?? 'id']: pagination.sortDirection ?? 'DESC'},
            skip: (pagination.page - 1) * pagination.rowsPerPage,
            take: pagination.rowsPerPage,
        });
        return {
            content: products,
            totalElements: count
        }
    }

    async findAllByIdIn(ids: number[]) {
        return await AppDataSource.getMongoRepository(Product).find({
            where: {
                id: {$in: ids}
            }
        })
    }

    findById = async (id: number) => {
        return await AppDataSource.getMongoRepository(Product).findOneBy({
            id
        })
    }
}