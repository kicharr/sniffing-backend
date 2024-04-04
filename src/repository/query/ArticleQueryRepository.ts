import {ArticleQueryDTO} from "./dto/ArticleQueryDTO";

export interface ArticleQueryRepository {
    getById(id: string): Promise<ArticleQueryDTO>

    getAll(): Promise<void>
}