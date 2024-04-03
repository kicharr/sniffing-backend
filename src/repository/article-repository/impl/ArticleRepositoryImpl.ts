import {ArticleRepository} from "../ArticleRepository";
import {Article} from "../../../infrastucture/entity/Article";

export class ArticleRepositoryImpl implements ArticleRepository {
    private readonly db

    constructor(db) {
        this.db = db
    }

    async store(article: Article): Promise<void> {
        try {
            await this.db.none(
                `
                    INSERT INTO articles (id, title, body, create_date, preview_url)
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (id) DO UPDATE SET title       = $2,
                                                   body        = $3,
                                                   create_date = $4,
                                                   preview_url = $5
                `,
                [article.id, article.title, article.body, article.creationDate, article.preview])
        } catch (e) {
            console.log(e)
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.db.none('DELETE FROM articles WHERE id = $1', [id])
        } catch (e) {
            console.log(e)
        }
    }

}