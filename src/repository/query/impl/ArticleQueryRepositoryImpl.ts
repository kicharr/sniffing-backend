import {ArticleQueryRepository} from "../ArticleQueryRepository";
import {ArticleQueryDTO} from "../dto/ArticleQueryDTO";

export class ArticleQueryRepositoryImpl implements ArticleQueryRepository {
    private readonly db

    constructor(db) {
        this.db = db
    }


    async getById(id: string): Promise<ArticleQueryDTO> {
        try {
            const articleData = await this.db.oneOrNone('SELECT * FROM articles WHERE id = $1', [id]);

            return {
                id: articleData?.id,
                title: articleData?.title,
                body: articleData?.body,
                createDate: articleData?.create_date,
                previewUrl: articleData?.preview_url
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(): Promise<void> {
        try {
            const articlesList = await this.db.manyOrNone('SELECT * FROM articles');
            return articlesList;
        } catch (e) {
            console.log(e)
        }
    }
}