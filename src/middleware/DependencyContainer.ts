import {UserServiceImpl} from "../service/impl/UserServieImpl";
import {UserRepository} from "../repository/UserRepository";
import {UserRepositoryImpl} from "../repository/impl/UserRepositoryImpl";
import {UserService} from "../service/UserService";
import pgp from 'pg-promise'
import {UserQueryRepository} from "../repository/UserQueryRepository";
import {UserQueryRepositoryImpl} from "../repository/impl/UserQueryRepositoryImpl";

export class DependencyContainer {
    private dbClient
    static dependencyContainer: DependencyContainer = null

    constructor() {
        if (DependencyContainer.dependencyContainer) {
            console.log('Container exist');
            return;
        }

        try {
            // postgres://postgres:1234@localhost:5432/postgres
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

    UserRepository(): UserRepository {
        return new UserRepositoryImpl(this.dbClient)
    }

    UserService(): UserService {
        return new UserServiceImpl(this.UserRepository())
    }

    UserQueryRepository():UserQueryRepository {
        return new UserQueryRepositoryImpl(this.dbClient)
    }
}

