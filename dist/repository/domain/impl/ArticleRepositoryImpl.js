"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRepositoryImpl = void 0;
const Article_1 = require("../../../infrastucture/entity/Article");
const User_1 = require("../../../infrastucture/entity/User");
class ArticleRepositoryImpl {
    constructor(db) {
        this.db = db;
    }
    store(article) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.none(`
                    INSERT INTO articles (id, title, body, create_date, preview_url)
                    VALUES ($1, $2, $3, $4, $5)
                    ON CONFLICT (id) DO UPDATE SET title       = $2,
                                                   body        = $3,
                                                   preview_url = $5
                `, [article.id, article.title, article.body, article.creationDate, article.preview]);
                yield this.db.none(`INSERT INTO articles_authors (user_id, article_id)
                                VALUES ($1, $2)
                                ON CONFLICT DO NOTHING`, [article.author.id, article.id]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAuthorByArticleId(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.db.oneOrNone(`SELECT id,
                                                         first_name,
                                                         second_name,
                                                         birth_date,
                                                         registration_date,
                                                         sex,
                                                         avatar_url
                                                  FROM articles_authors as a
                                                           LEFT JOIN users as u on u.id = a.user_id
                                                  WHERE article_id = $1`, [articleId]);
                return data ? new User_1.User(data === null || data === void 0 ? void 0 : data.first_name, data === null || data === void 0 ? void 0 : data.second_name, data === null || data === void 0 ? void 0 : data.birth_date, data === null || data === void 0 ? void 0 : data.sex, data === null || data === void 0 ? void 0 : data.registration_date, data === null || data === void 0 ? void 0 : data.avatar_url, data === null || data === void 0 ? void 0 : data.id) : null;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.db.oneOrNone('SELECT * FROM articles WHERE id = $1', [id]);
                const author = yield this.getAuthorByArticleId(data === null || data === void 0 ? void 0 : data.id);
                if (!data || !author) {
                    return null;
                }
                return new Article_1.Article(data === null || data === void 0 ? void 0 : data.title, data === null || data === void 0 ? void 0 : data.body, data === null || data === void 0 ? void 0 : data.preview_url, author, data === null || data === void 0 ? void 0 : data.create_date, data === null || data === void 0 ? void 0 : data.id);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.none('DELETE FROM articles WHERE id = $1', [id]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.ArticleRepositoryImpl = ArticleRepositoryImpl;
//# sourceMappingURL=ArticleRepositoryImpl.js.map