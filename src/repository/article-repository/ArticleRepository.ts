import {Article} from "../../infrastucture/entity/Article";

export interface ArticleRepository {
    store(article: Article): Promise<void>

    deleteById(id: string): Promise<void>
}