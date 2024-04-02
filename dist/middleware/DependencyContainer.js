"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyContainer = void 0;
const UserServieImpl_1 = require("../service/impl/UserServieImpl");
const UserRepositoryImpl_1 = require("../repository/impl/UserRepositoryImpl");
const pg_promise_1 = __importDefault(require("pg-promise"));
const UserQueryRepositoryImpl_1 = require("../repository/impl/UserQueryRepositoryImpl");
class DependencyContainer {
    constructor() {
        if (DependencyContainer.dependencyContainer) {
            console.log('Container exist');
            return;
        }
        try {
            // postgres://postgres:1234@localhost:5432/postgres
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
    UserRepository() {
        return new UserRepositoryImpl_1.UserRepositoryImpl(this.dbClient);
    }
    UserService() {
        return new UserServieImpl_1.UserServiceImpl(this.UserRepository());
    }
    UserQueryRepository() {
        return new UserQueryRepositoryImpl_1.UserQueryRepositoryImpl(this.dbClient);
    }
}
exports.DependencyContainer = DependencyContainer;
DependencyContainer.dependencyContainer = null;
//# sourceMappingURL=DependencyContainer.js.map