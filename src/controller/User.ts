import {NextFunction, Request, Response} from "express";
import {UserService} from "../service/UserService";
import {UserDTO} from "../infrastucture/dto/UserDTO";
import {UserQueryRepository} from "../repository/query/UserQueryRepository";
import {UserQueryDTO} from "../repository/query/dto/UserQueryDTO";
import {generateTokenFromId, getIdFromToken} from "../lib/tokenAuthorization";
import user from "../routers/user";

export class UserController {
    private readonly userService: UserService
    private readonly userQueryRepository: UserQueryRepository

    constructor(userService: UserService, userQueryRepository: UserQueryRepository) {
        this.userService = userService
        this.userQueryRepository = userQueryRepository
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {login, password, firstName, secondName, sex, birthDate, avatarUrl} = req.body;

            const newUser: UserDTO = {
                login,
                password,
                firstName,
                secondName,
                sex,
                birthDate,
                avatarUrl,
            }

            await this.userService.createUser(newUser);

            res.status(200).json(`User ${newUser?.firstName} successfully added!`);
        } catch (e) {
            next(e)
        }
    }

    async authorization(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {login, password} = req.body;
            const token: string = await this.userService.authorization({login, password});
            res.status(200).json({token: token})
        } catch (e) {
            res.status(401).json('Invalid login data')
        }
    }

    async getUserInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token: string = req?.header('X-Auth-Token');
            const userId: string = getIdFromToken(token);

            const userData: UserQueryDTO = await this.userQueryRepository.getById(userId);
            res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token: string = req?.header('X-Auth-Token');
            const userId: string = getIdFromToken(token);
            const userData: UserQueryDTO = await this.userQueryRepository.getById(userId);

            if (!userData) {
                return;
            }

            const usersList: Array<UserQueryDTO> = await this.userQueryRepository.getAll();
            res.status(200).json(usersList);
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token: string = req?.header('X-Auth-Token');
            const userId: string = getIdFromToken(token);
            const userData: UserQueryDTO = await this.userQueryRepository.getById(userId);

            if (!userData) {
                return;
            }

            const {login = null, password = null, firstName = null, secondName = null, sex = null, birthDate = null, avatarUrl = null} = req.body;

            const id: string = req.params.id;

            const changedUserData: UserDTO = {
                id,
                login,
                password,
                firstName,
                secondName,
                sex,
                birthDate,
                avatarUrl
            }

            await this.userService.changeUserData(changedUserData)

            res.status(200).json(`User ${id} was successfully updated!`);
        } catch (e) {
            next(e)
        }
    }

    async removeUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token: string = req?.header('X-Auth-Token');
            const userId: string = getIdFromToken(token);

            await this.userService.deleteById(userId);
            res.status(200).json(`User with id ${req.params?.id}, deleted from users`);
        } catch (e) {
            next(e)
        }
    }
}