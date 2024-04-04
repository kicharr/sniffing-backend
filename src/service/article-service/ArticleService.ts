import {ArticleDTO} from "../../infrastucture/dto/ArticleDTO";
import {Article} from "../../infrastucture/entity/Article";

export interface ArticleService {
    createArticle(article: ArticleDTO, userId:string): Promise<void>

    updateById(article: ArticleDTO): Promise<void>

    deleteById(id: string): Promise<void>
}