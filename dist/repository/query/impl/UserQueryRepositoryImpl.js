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
exports.UserQueryRepositoryImpl = void 0;
class UserQueryRepositoryImpl {
    constructor(db) {
        this.db = db;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
                return {
                    firstName: userData === null || userData === void 0 ? void 0 : userData.first_name,
                    secondName: userData === null || userData === void 0 ? void 0 : userData.second_name,
                    sex: userData === null || userData === void 0 ? void 0 : userData.sex,
                    birthDate: userData === null || userData === void 0 ? void 0 : userData.birth_date,
                    avatarUrl: userData === null || userData === void 0 ? void 0 : userData.avatar_url
                };
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersList = yield this.db.manyOrNone('SELECT * FROM users');
                return usersList;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.UserQueryRepositoryImpl = UserQueryRepositoryImpl;
//# sourceMappingURL=UserQueryRepositoryImpl.js.map