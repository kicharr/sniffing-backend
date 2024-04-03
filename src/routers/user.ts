import {NextFunction, Router, Response, Request} from "express";
import {UserController} from "../controller/User";
import {DependencyContainer} from "../middleware/DependencyContainer";

const router: Router = Router();

const initController = (): UserController => new UserController(DependencyContainer.dependencyContainer.UserService(), DependencyContainer.dependencyContainer.UserQueryRepository());

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initController();
    await controller.createUser(req, res, next)
}

const getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initController();
    await controller.getUserInfo(req, res, next)
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initController();
    await controller.getAllUsers(req, res, next)
}

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initController();
    await controller.updateUser(req, res, next)
}

const removeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: UserController = initController();
    await controller.removeUser(req, res, next)
}

router.post('/user', createUser);
router.get('/user/:id', getUserInfo);
router.get('/users', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', removeUser);

export default router;