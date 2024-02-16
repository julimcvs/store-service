import {Entity, Column, BaseEntity, PrimaryColumn, ObjectIdColumn} from "typeorm"
import {ObjectId} from "mongodb";

@Entity({name: 'products'})
export class Product extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    category: string

    @Column()
    image: string
}
