import {NextFunction, Request, Response} from "express";
import {ArticleService} from "../service/ArticleService";
import {ArticleQueryRepository} from "../repository/query/ArticleQueryRepository";
import {ArticleDTO} from "../infrastucture/dto/ArticleDTO";
import {ArticleQueryDTO} from "../repository/query/dto/ArticleQueryDTO"

export class ArticleController {
    private readonly articleService: ArticleService
    private readonly articleQueryRepository: ArticleQueryRepository

    constructor(articleService: ArticleService, articleQueryRepository: ArticleQueryRepository) {
        this.articleService = articleService;
        this.articleQueryRepository = articleQueryRepository;
    }


    async createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {title, body, previewUrl, userId} = req.body;

            const newArticle: ArticleDTO = {title, body, previewUrl}

            await this.articleService.createArticle(newArticle,userId);

            res.status(200).json(`Article ${newArticle?.id} successfully added!`);
        } catch (e) {
            console.log(e)
        }
    }

    async getArticleInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const article: ArticleQueryDTO = await this.articleQueryRepository.getById(req.params.id as string);
            res.status(200).json(article);
        } catch (e) {
            console.log(e)
        }
    }

    async getAllArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const articlesList = await this.articleQueryRepository.getAll();
            res.status(200).json(articlesList);
        } catch (e) {
            console.log(e)
        }
    }

    async updateArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {title = null, body = null, previewUrl = null}: ArticleDTO = req.body;

            const id: string = req.params.id;

            const changedArticleData: ArticleDTO = {id, title, body, previewUrl};

            await this.articleService.updateById(changedArticleData);
            res.status(200).json('ok');
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