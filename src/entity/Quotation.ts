import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ObjectIdColumn} from "typeorm"
import {QuotationDetail} from "./QuotationDetail";
import {ObjectId} from "mongodb";

@Entity({name: 'quotation'})
export class Quotation extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    status: string

    @Column()
    totalAmount: number

    @Column()
    quotationDetails: QuotationDetail[];
}
