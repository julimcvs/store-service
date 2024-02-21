import {Quotation} from "../entity/Quotation";
import {QuotationStatusEnum} from "../enums/QuotationStatusEnum";
import {AppDataSource} from "../data-source";
import {ObjectId} from "mongodb";

export default class QuotationRepository {
    findById = async (id: ObjectId) => {
        return AppDataSource.getMongoRepository(Quotation).findOneBy(
            {
                _id: id,
                status: QuotationStatusEnum.STARTED
            }
        );
    }
}