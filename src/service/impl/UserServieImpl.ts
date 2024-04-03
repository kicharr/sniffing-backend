import {UserService} from "../UserService";
import {UserRepository} from "../../repository/UserRepository";
import {User} from "../../infrastucture/entity/User";
import {UserDTO} from "../../infrastucture/dto/UserDTO";

export class UserServiceImpl implements UserService {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async createUser(user: UserDTO): Promise<void> {
        const newUser: User = new User(user.firstName, user.secondName, user.birthDate, user.sex, user.registrationDate, user.avatarUrl);
        await this.userRepository.store(newUser)
    }

    async changeUserData(user: UserDTO): Promise<void> {
        const userData: User = await this.userRepository.getById(user?.id)

        userData.firstName = user.firstName ?? userData.firstName;
        userData.secondName = user.secondName ?? userData.secondName;
        userData.sex = user.sex ?? userData.sex;
        userData.birthDate = user.birthDate ?? userData.birthDate;
        userData.avatarUrl = user.avatarUrl ?? userData.avatarUrl;

        await this.userRepository.store(userData);
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.userRepository.deleteById(id);
        } catch (e) {
            console.log(e)
        }
    }
}