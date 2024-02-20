import {User} from "../entity/User";
import {AppDataSource} from "../data-source";

export default class UserRepository {
    findById = async (id: number) => {
        return await AppDataSource.getMongoRepository(User).findOne({
            where: {
                id
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