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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Article_1 = require("../controller/Article");
const DependencyContainer_1 = require("../middleware/DependencyContainer");
const user_1 = __importDefault(require("./user"));
const articleRouter = (0, express_1.Router)();
// initialising the controller for an entity
const initArticleController = () => {
    return new Article_1.ArticleController(DependencyContainer_1.DependencyContainer.dependencyContainer.ArticleService(), DependencyContainer_1.DependencyContainer.dependencyContainer.ArticleQueryRepository);
};
// Methods of working on the essence
const createArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initArticleController();
    yield controller.createArticle(req, res, next);
});
const deleteArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initArticleController();
    yield controller.deleteArticle(req, res, next);
});
// Routes on which I call methods
user_1.default.post('/article', createArticle);
user_1.default.delete('/article/:id', deleteArticle);
exports.default = articleRouter;
//# sourceMappingURL=article.js.map