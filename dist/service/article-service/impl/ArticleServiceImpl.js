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
exports.ArticleServiceImpl = void 0;
const Article_1 = require("../../../infrastucture/entity/Article");
class ArticleServiceImpl {
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    createArticle(article) {
        return __awaiter(this, void 0, void 0, function* () {
            const newArticle = new Article_1.Article(article.title, article.body, article.createDate, article.previewUrl);
            yield this.articleRepository.store(newArticle);
        });
    }
    updateById(article) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const currentArticleData = yield this.articleRepository.getById(article === null || article === void 0 ? void 0 : article.id);
            currentArticleData.title = (_a = article === null || article === void 0 ? void 0 : article.title) !== null && _a !== void 0 ? _a : currentArticleData.title;
            currentArticleData.body = (_b = article === null || article === void 0 ? void 0 : article.body) !== null && _b !== void 0 ? _b : currentArticleData.body;
            currentArticleData.preview = (_c = article === null || article === void 0 ? void 0 : article.previewUrl) !== null && _c !== void 0 ? _c : currentArticleData.preview;
            yield this.articleRepository.store(currentArticleData);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.articleRepository.deleteById(id);
        });
    }
}
exports.ArticleServiceImpl = ArticleServiceImpl;
//# sourceMappingURL=ArticleServiceImpl.js.map