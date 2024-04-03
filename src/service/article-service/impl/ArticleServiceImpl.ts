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

    async updateById(article: ArticleDTO): Promise<void> {
        const currentArticleData: Article = await this.articleRepository.getById(article?.id);

        currentArticleData.title = article?.title ?? currentArticleData.title;
        currentArticleData.body = article?.body ?? currentArticleData.body;
        currentArticleData.preview = article?.previewUrl ?? currentArticleData.preview;

        await this.articleRepository.store(currentArticleData);
    }

    async deleteById(id: string): Promise<void> {
        await this.articleRepository.deleteById(id);
    }
}