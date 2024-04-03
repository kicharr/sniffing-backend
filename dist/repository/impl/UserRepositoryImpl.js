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
exports.UserRepositoryImpl = void 0;
const User_1 = require("../../infrastucture/entity/User");
class UserRepositoryImpl {
    constructor(db) {
        this.db = db;
    }
    store(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.none(`
                        INSERT INTO users (id, first_name, second_name, birth_date, registration_date, sex, avatar_url)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        ON CONFLICT (id) DO UPDATE SET first_name  = $2,
                                                       second_name = $3,
                                                       birth_date  = $4,
                                                       sex         = $6,
                                                       avatar_url  = $7`, [user.id, user.firstName, user.secondName, user.birthDate, user.registrationDate, user.sex, user.avatarUrl]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
                if (!data) {
                    return null;
                }
                return new User_1.User(data === null || data === void 0 ? void 0 : data.first_name, data === null || data === void 0 ? void 0 : data.second_name, data === null || data === void 0 ? void 0 : data.birth_date, data === null || data === void 0 ? void 0 : data.sex, data === null || data === void 0 ? void 0 : data.registration_date, data === null || data === void 0 ? void 0 : data.avatar_url, data === null || data === void 0 ? void 0 : data.id);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.oneOrNone('DELETE FROM users WHERE id = $1', [id]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
//# sourceMappingURL=UserRepositoryImpl.js.map