import pgp from 'pg-promise'

import {UserServiceImpl} from "../service/user-service/impl/UserServieImpl";
import {UserRepository} from "../repository/domain/UserRepository";
import {UserRepositoryImpl} from "../repository/domain/impl/UserRepositoryImpl";
import {UserService} from "../service/user-service/UserService";
import {UserQueryRepository} from "../repository/query/UserQueryRepository";
import {UserQueryRepositoryImpl} from "../repository/query/impl/UserQueryRepositoryImpl";


import {ArticleRepository} from "../repository/domain/ArticleRepository";
import {ArticleRepositoryImpl} from "../repository/domain/impl/ArticleRepositoryImpl";
import {ArticleService} from "../service/article-service/ArticleService";
import {ArticleServiceImpl} from "../service/article-service/impl/ArticleServiceImpl";
import {ArticleQueryRepository} from "../repository/query/ArticleQueryRepository";
import {ArticleQueryRepositoryImpl} from "../repository/query/impl/ArticleQueryRepositoryImpl";

export class DependencyContainer {
    private dbClient
    static dependencyContainer: DependencyContainer = null

    constructor() {
        if (DependencyContainer.dependencyContainer) {
            console.log('Container exist');
            return;
        }

        try {
            this.dbClient = pgp()({
                host: 'localhost',
                port: 5432,
                database: 'postgres',
                user: 'postgres',
                password: '1234'
            })
        } catch (e) {
            console.log(e)
        }

        DependencyContainer.dependencyContainer = this
    }


    // Users
    UserRepository = (): UserRepository => new UserRepositoryImpl(this.dbClient);
    UserService = (): UserService => new UserServiceImpl(this.UserRepository());
    UserQueryRepository = (): UserQueryRepository => new UserQueryRepositoryImpl(this.dbClient);


    // Articles
    ArticleRepository = (): ArticleRepository => new ArticleRepositoryImpl(this.dbClient);
    ArticleService = (): ArticleService => new ArticleServiceImpl(this.ArticleRepository(),this.UserRepository());
    ArticleQueryRepository = (): ArticleQueryRepository => new ArticleQueryRepositoryImpl(this.dbClient);
}

