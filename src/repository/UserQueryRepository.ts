import {UserQueryDTO} from "./dto/UserQueryDTO";

export interface UserQueryRepository {
    getById(id: string): Promise<UserQueryDTO>
}