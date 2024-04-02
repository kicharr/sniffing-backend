import {UserRepository} from "../UserRepository";
import {User} from "../../infrastucture/entity/User";
import user from "../../routers/user";

export class UserRepositoryImpl implements UserRepository {
    private readonly db

    constructor(db) {
        this.db = db
    }

    async store(user: User): Promise<void> {
        try {
            await this.db.none(`
                        INSERT INTO users (id, first_name, second_name, birth_date, registration_date, sex, avatar_url)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        ON CONFLICT (id) DO UPDATE SET first_name  = $2,
                                                       second_name = $3,
                                                       birth_date  = $4,
                                                       sex         = $6,
                                                       avatar_url  = $7`,
                [user.id, user.firstName, user.secondName, user.birthDate, user.registrationDate, user.sex, user.avatarUrl])
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

            return new User(data?.first_name, data?.second_name, data?.birth_date, data?.sex, data?.registration_date, data?.avatar_url, data?.id)
        } catch (e) {
            console.log(e)
        }
    }
}