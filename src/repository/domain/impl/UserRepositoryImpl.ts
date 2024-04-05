import {UserRepository} from "../UserRepository";
import {User} from "../../../infrastucture/entity/User";
import {UserDTO} from "../../../infrastucture/dto/UserDTO";


export class UserRepositoryImpl implements UserRepository {
    private readonly db

    constructor(db) {
        this.db = db
    }

    async store(user: User): Promise<void> {
        try {
            await this.db.none(
                `
                    INSERT INTO users (id, login, password, first_name, second_name, birth_date, registration_date, sex,
                                       avatar_url)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    ON CONFLICT (id) DO UPDATE SET login       = $2,
                                                   password    = $3,
                                                   first_name  = $4,
                                                   second_name = $5,
                                                   birth_date  = $6,
                                                   sex         = $8,
                                                   avatar_url  = $9
                `,
                [user.id, user.login, user.password, user.firstName, user.secondName, user.birthDate, user.registrationDate, user.sex, user.avatarUrl])
        } catch (e) {
            console.log(e)
        }
    }


    async getByLogin(login: string): Promise<User> {
        try {
            const data = await this.db.oneOrNone(`
                        SELECT *
                        FROM users
                        WHERE login = $1
                `, [login]
            )

            return new User(data?.login, data?.password, data?.first_name, data?.second_name, data?.birth_date, data?.sex, data?.registration_date, data?.avatar_url, data?.id)
        } catch (e) {
            console.log(e)
        }
    }

    async getById(id: string): Promise<User> {
        try {
            const data = await this.db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);

            if (!data) {
                return null
            }

            return new User(data?.login, data?.password, data?.first_name, data?.second_name, data?.birth_date, data?.sex, data?.registration_date, data?.avatar_url,  data?.id)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.db.none('DELETE FROM users WHERE id = $1', [id]);
        } catch (e) {
            console.log(e)
        }
    }
}