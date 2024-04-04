import {ArticleRepository} from "../ArticleRepository";
import {Article} from "../../../infrastucture/entity/Article";
import {User} from "../../../infrastucture/entity/User";

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
                                                   preview_url = $5
                `,
                [article.id, article.title, article.body, article.creationDate, article.preview])

            await this.db.none(`INSERT INTO articles_authors (user_id, article_id)
                                VALUES ($1, $2)
                                ON CONFLICT DO NOTHING`, [article.author.id, article.id])
        } catch (e) {
            console.log(e)
        }
    }


    async getAuthorByArticleId(articleId: string): Promise<User> {
        try {
            const data = await this.db.oneOrNone(`SELECT id,
                                                         first_name,
                                                         second_name,
                                                         birth_date,
                                                         registration_date,
                                                         sex,
                                                         avatar_url
                                                  FROM articles_authors as a
                                                           LEFT JOIN users as u on u.id = a.user_id
                                                  WHERE article_id = $1`, [articleId]);
            return data ? new User(data?.first_name, data?.second_name, data?.birth_date, data?.sex, data?.registration_date, data?.avatar_url, data?.id) : null;
        } catch (e) {
            console.log(e);
        }
    }

    async getById(id: string): Promise<Article> {
        try {
            const data = await this.db.oneOrNone('SELECT * FROM articles WHERE id = $1', [id]);

            const author = await this.getAuthorByArticleId(data?.id);

            if (!data || !author) {
                return null
            }

            return new Article(data?.title, data?.body, data?.preview_url, author, data?.create_date, data?.id);
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