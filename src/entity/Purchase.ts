import {Entity, Column, BaseEntity, ObjectIdColumn} from "typeorm"
import {PurchaseDetail} from "./PurchaseDetail";
import {ObjectId} from "mongodb";

@Entity({name: 'purchase'})
export class Purchase extends BaseEntity {

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    userId: ObjectId

    @Column()
    purchaseDate: Date

    @Column()
    totalAmount: number

    @Column()
    purchaseDetails: PurchaseDetail[];
}
