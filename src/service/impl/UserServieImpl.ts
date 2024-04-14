import {UserService} from "../UserService";
import {UserRepository} from "../../repository/domain/UserRepository";
import {User} from "../../infrastucture/entity/User";
import {UserDTO} from "../../infrastucture/dto/UserDTO";
import {generateTokenFromId} from "../../lib/tokenAuthorization";
import user from "../../routers/user";

export class UserServiceImpl implements UserService {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async createUser(user: UserDTO): Promise<void> {
        const newUser: User = new User(user.login, user.password, user.firstName, user.secondName, user.birthDate, user.sex, user.registrationDate, user.avatarUrl);
        await this.userRepository.store(newUser);
    }

    async authorization({login, password}): Promise<string> {
        const userData: User = await this.userRepository.getByLogin(login);

        if (userData?.password !== password) {
            throw new Error('Invalid authorization data');
        }

        return generateTokenFromId(userData?.id);
    }



    async changeUserData(user: UserDTO): Promise<void> {
        const userData: User = await this.userRepository.getById(user?.id)

        userData.login = user.login ?? userData?.login;
        userData.password = user.password ?? userData?.password;
        userData.firstName = user?.firstName ?? userData.firstName;
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