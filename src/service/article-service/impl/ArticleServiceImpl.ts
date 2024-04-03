import {ArticleService} from "../ArticleService";
import {ArticleRepository} from "../../../repository/article-repository/ArticleRepository";
import {ArticleDTO} from "../../../infrastucture/dto/ArticleDTO";
import {Article} from "../../../infrastucture/entity/Article";

export class ArticleServiceImpl implements ArticleService {
    private readonly articleRepository: ArticleRepository

    constructor(articleRepository: ArticleRepository) {
        this.articleRepository = articleRepository
    }

    async createArticle(article: ArticleDTO): Promise<void> {
        const newArticle: Article = new Article(article.title, article.body, article.createDate, article.previewUrl);
        await this.articleRepository.store(newArticle);
    }

    async deleteById(id: string): Promise<void> {
        await this.articleRepository.deleteById(id);
    }
}