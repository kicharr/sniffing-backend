import {ArticleService} from "../ArticleService";
import {ArticleRepository} from "../../repository/domain/ArticleRepository";
import {ArticleDTO} from "../../infrastucture/dto/ArticleDTO";
import {Article} from "../../infrastucture/entity/Article";
import {UserRepository} from "../../repository/domain/UserRepository";
import {User} from "../../infrastucture/entity/User";

export class ArticleServiceImpl implements ArticleService {
    private readonly articleRepository: ArticleRepository;
    private readonly userRepository: UserRepository;

    constructor(articleRepository: ArticleRepository, userRepository: UserRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository
    }

    async createArticle(article: ArticleDTO, userId: string): Promise<void> {
        const author: User = await this.userRepository.getById(userId);
        const newArticle: Article = new Article(article.title, article.body, article.previewUrl, author);
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