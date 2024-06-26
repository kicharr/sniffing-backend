import {UserDTO} from "../infrastucture/dto/UserDTO";
import {User} from "../infrastucture/entity/User";


export interface UserService {
    createUser(user: UserDTO): Promise<void>

    authorization({login, password}): Promise<string>

    changeUserData(user: UserDTO): Promise<void>

    deleteById(id: string): Promise<void>
}

