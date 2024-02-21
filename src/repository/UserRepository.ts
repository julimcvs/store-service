import {User} from "../entity/User";
import {AppDataSource} from "../data-source";
import {ObjectId} from "mongodb";

export default class UserRepository {
    findById = async (id: ObjectId) => {
        return await AppDataSource.getMongoRepository(User).findOne({
            where: {
                _id: id
            }
        });
    }

    findByEmail = async (email: string) => {
        return await AppDataSource.getMongoRepository(User).findOne({
            where: {
                email
            }
        });
    }
}