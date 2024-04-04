"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyContainer = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const UserServieImpl_1 = require("../service/user-service/impl/UserServieImpl");
const UserRepositoryImpl_1 = require("../repository/domain/impl/UserRepositoryImpl");
const UserQueryRepositoryImpl_1 = require("../repository/query/impl/UserQueryRepositoryImpl");
const ArticleRepositoryImpl_1 = require("../repository/domain/impl/ArticleRepositoryImpl");
const ArticleServiceImpl_1 = require("../service/article-service/impl/ArticleServiceImpl");
const ArticleQueryRepositoryImpl_1 = require("../repository/query/impl/ArticleQueryRepositoryImpl");
class DependencyContainer {
    constructor() {
        // Users
        this.UserRepository = () => new UserRepositoryImpl_1.UserRepositoryImpl(this.dbClient);
        this.UserService = () => new UserServieImpl_1.UserServiceImpl(this.UserRepository());
        this.UserQueryRepository = () => new UserQueryRepositoryImpl_1.UserQueryRepositoryImpl(this.dbClient);
        // Articles
        this.ArticleRepository = () => new ArticleRepositoryImpl_1.ArticleRepositoryImpl(this.dbClient);
        this.ArticleService = () => new ArticleServiceImpl_1.ArticleServiceImpl(this.ArticleRepository(), this.UserRepository());
        this.ArticleQueryRepository = () => new ArticleQueryRepositoryImpl_1.ArticleQueryRepositoryImpl(this.dbClient);
        if (DependencyContainer.dependencyContainer) {
            console.log('Container exist');
            return;
        }
        try {
            this.dbClient = (0, pg_promise_1.default)()({
                host: 'localhost',
                port: 5432,
                database: 'postgres',
                user: 'postgres',
                password: '1234'
            });
        }
        catch (e) {
            console.log(e);
        }
        DependencyContainer.dependencyContainer = this;
    }
}
exports.DependencyContainer = DependencyContainer;
DependencyContainer.dependencyContainer = null;
//# sourceMappingURL=DependencyContainer.js.map