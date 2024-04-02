import {UserQueryDTO} from "../dto/UserQueryDTO";
import {UserQueryRepository} from "../UserQueryRepository";

export class UserQueryRepositoryImpl implements UserQueryRepository {
    private readonly db

    constructor(db) {
        this.db = db
    }

    async getById(id: string): Promise<UserQueryDTO> {
        try {
            const userData = await this.db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);

            return {
                firstName: userData?.first_name,
                secondName: userData?.second_name,
                sex: userData?.sex,
                birthDate: userData?.birth_date,
                avatarUrl: userData?.avatar_url
            }
        } catch (e) {
            console.log(e)
        }
    }


}