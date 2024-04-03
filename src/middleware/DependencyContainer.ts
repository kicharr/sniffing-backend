import pgp from 'pg-promise'

import {UserServiceImpl} from "../service/user-service/impl/UserServieImpl";
import {UserRepository} from "../repository/user-repository/UserRepository";
import {UserRepositoryImpl} from "../repository/user-repository/impl/UserRepositoryImpl";
import {UserService} from "../service/user-service/UserService";
import {UserQueryRepository} from "../repository/user-repository/UserQueryRepository";
import {UserQueryRepositoryImpl} from "../repository/user-repository/impl/UserQueryRepositoryImpl";


import {ArticleRepository} from "../repository/article-repository/ArticleRepository";
import {ArticleRepositoryImpl} from "../repository/article-repository/impl/ArticleRepositoryImpl";
import {ArticleService} from "../service/article-service/ArticleService";
import {ArticleServiceImpl} from "../service/article-service/impl/ArticleServiceImpl";
import {ArticleQueryRepository} from "../repository/article-repository/ArticleQueryRepository";
import {ArticleQueryRepositoryImpl} from "../repository/article-repository/impl/ArticleQueryRepositoryImpl";

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
    ArticleService = (): ArticleService => new ArticleServiceImpl(this.ArticleRepository());
    ArticleQueryRepository = (): ArticleQueryRepository => new ArticleQueryRepositoryImpl(this.dbClient);
}

