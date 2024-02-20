import {Entity, Column, BaseEntity, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm"
import {ObjectId} from "mongodb";
import {Address} from "./Address";

@Entity({name: 'user'})
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    cpf: string

    @Column()
    name: string

    @Column()
    birthDate: Date

    @Column()
    address: Address
}
