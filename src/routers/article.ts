import {NextFunction, Request, Response, Router} from "express";
import {ArticleController} from "../controller/Article";
import {DependencyContainer} from "../middleware/DependencyContainer";
import userRouter from "./user";

const articleRouter: Router = Router();


// initialising the controller for an entity
const initArticleController = (): ArticleController => {
    return new ArticleController(DependencyContainer.dependencyContainer.ArticleService(), DependencyContainer.dependencyContainer.ArticleQueryRepository);
}


// Methods of working on the essence
const createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: ArticleController = initArticleController();
    await controller.createArticle(req, res, next);
}

const deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const controller: ArticleController = initArticleController();
    await controller.deleteArticle(req, res, next);
}

// Routes on which I call methods
userRouter.post('/article', createArticle);
userRouter.delete('/article/:id', deleteArticle);

export default articleRouter;