import {User} from "../infrastucture/entity/User";

export interface UserRepository {
    store(user: User): Promise<void>

    getById(id: string): Promise<User>

    deleteById(id: string): Promise<void>
}