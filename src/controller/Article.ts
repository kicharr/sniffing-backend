import {NextFunction, Request, Response} from "express";
import {ArticleService} from "../service/article-service/ArticleService";
import {ArticleQueryRepository} from "../repository/article-repository/ArticleQueryRepository";
import {ArticleDTO} from "../infrastucture/dto/ArticleDTO";

export class ArticleController {
    private readonly articleService: ArticleService
    private readonly articleQueryRepository: ArticleQueryRepository

    constructor(articleService: ArticleService, articleQueryRepository: ArticleQueryRepository) {
        this.articleService = articleService;
        this.articleQueryRepository = articleQueryRepository;
    }


    async createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {title, body, createDate, previewUrl} = req.body;

            const newArticle: ArticleDTO = {title, body, createDate, previewUrl}

            await this.articleService.createArticle(newArticle);

            res.status(200).json(`Article ${newArticle?.id} successfully added!`);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.articleService.deleteById(req.params?.id);
            res.status(200).json(`Article with id ${req.params?.id}, deleted from articles`);
        } catch (e) {
            console.log(e)
        }
    }
}