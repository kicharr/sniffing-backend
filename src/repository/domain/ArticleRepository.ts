import {Article} from "../../infrastucture/entity/Article";

export interface ArticleRepository {
    store(article: Article): Promise<void>

    getById(id: string): Promise<Article>

    deleteById(id: string): Promise<void>
}