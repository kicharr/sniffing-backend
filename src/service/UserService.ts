import {UserDTO} from "../infrastucture/dto/UserDTO";


export interface UserService {
    createUser(user: UserDTO): Promise<void>

    changeUserData(user: UserDTO): Promise<void>
}

