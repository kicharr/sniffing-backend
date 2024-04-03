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
exports.ArticleController = void 0;
class ArticleController {
    constructor(articleService, articleQueryRepository) {
        this.articleService = articleService;
        this.articleQueryRepository = articleQueryRepository;
    }
    createArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, body, createDate, previewUrl } = req.body;
                const newArticle = { title, body, createDate, previewUrl };
                yield this.articleService.createArticle(newArticle);
                res.status(200).json(`Article ${newArticle === null || newArticle === void 0 ? void 0 : newArticle.id} successfully added!`);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    deleteArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                console.log((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                yield this.articleService.deleteById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
                res.status(200).json(`Article with id ${(_c = req.params) === null || _c === void 0 ? void 0 : _c.id}, deleted from articles`);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=Article.js.map