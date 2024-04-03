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
exports.ArticleQueryRepositoryImpl = void 0;
class ArticleQueryRepositoryImpl {
    constructor(db) {
        this.db = db;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleData = yield this.db.oneOrNone('SELECT * FROM articles WHERE id = $1', [id]);
                return {
                    id: articleData === null || articleData === void 0 ? void 0 : articleData.id,
                    title: articleData === null || articleData === void 0 ? void 0 : articleData.title,
                    body: articleData === null || articleData === void 0 ? void 0 : articleData.body,
                    createDate: articleData === null || articleData === void 0 ? void 0 : articleData.create_date,
                    previewUrl: articleData === null || articleData === void 0 ? void 0 : articleData.preview_url
                };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articlesList = yield this.db.manyOrNone('SELECT * FROM articles');
                return articlesList;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.ArticleQueryRepositoryImpl = ArticleQueryRepositoryImpl;
//# sourceMappingURL=ArticleQueryRepositoryImpl.js.map