import {Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn} from "typeorm"
import {ObjectId} from "mongodb";

@Entity({name: "address"})
export class Address {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    street: string

    @Column()
    neighborhood: string

    @Column()
    number: string

    @Column()
    zipCode: string

    @Column()
    state: string
}
