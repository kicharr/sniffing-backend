import {NextFunction, Router, Response, Request} from "express";
import {UserController} from "../controller/User";
import {DependencyContainer} from "../middleware/DependencyContainer";

const userRouter: Router = Router();

// initialising the controller for an entity
const initUserController = (): UserController => {
    return new UserController(DependencyContainer.dependencyContainer.UserService(), DependencyContainer.dependencyContainer.UserQueryRepository());
}


// Methods of working on the essence
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initUserController();
    await controller.createUser(req, res, next)
}
const getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initUserController();
    await controller.getUserInfo(req, res, next)
}
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initUserController();
    await controller.getAllUsers(req, res, next)
}
const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initUserController();
    await controller.updateUser(req, res, next)
}
const removeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initUserController();
    await controller.removeUser(req, res, next)
}


// Routes on which I call methods
userRouter.post('/user', createUser);
userRouter.get('/user/:id', getUserInfo);
userRouter.get('/users', getAllUsers);
userRouter.put('/user/:id', updateUser);
userRouter.delete('/user/:id', removeUser);


export default userRouter;