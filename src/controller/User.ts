import {NextFunction, Request, Response} from "express";
import {UserService} from "../service/UserService";
import {UserDTO} from "../infrastucture/dto/UserDTO";
import {UserQueryRepository} from "../repository/UserQueryRepository";
import {UserQueryDTO} from "../repository/dto/UserQueryDTO";

export class UserController {
    private readonly userService: UserService
    private readonly userQueryRepository: UserQueryRepository

    constructor(userService: UserService, userQueryRepository: UserQueryRepository) {
        this.userService = userService
        this.userQueryRepository = userQueryRepository
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {firstName, secondName, sex, birthDate, avatarUrl} = req.body;

            const newUser: UserDTO = {
                firstName,
                secondName,
                sex,
                birthDate,
                avatarUrl
            }

            await this.userService.createUser(newUser);

            res.status(200).json(`User ${newUser?.firstName} successfully added!`);
        } catch (e) {
            next(e)
        }
    }

    async getUserInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: UserQueryDTO = await this.userQueryRepository.getById(req.params.id as string);
            res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const usersList = await this.userQueryRepository.getAll();
            res.status(200).json(usersList);
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {firstName = null, secondName = null, sex = null, birthDate = null, avatarUrl = null} = req.body;

            const id: string = req.params.id;

            const changedUserData: UserDTO = {
                id,
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
            await this.userService.deleteById(req.params?.id);
            res.status(200).json(`User with id ${req.params?.id}, deleted from users`);
        } catch (e) {
            next(e)
        }
    }
}