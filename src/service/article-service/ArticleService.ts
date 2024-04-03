import {ArticleDTO} from "../../infrastucture/dto/ArticleDTO";

export interface ArticleService {
    createArticle(article: ArticleDTO): Promise<void>

    deleteById(id: string): Promise<void>
}