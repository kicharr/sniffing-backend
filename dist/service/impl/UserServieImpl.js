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
exports.UserServiceImpl = void 0;
const User_1 = require("../../infrastucture/entity/User");
const tokenAuthorization_1 = require("../../lib/tokenAuthorization");
class UserServiceImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.User(user.login, user.password, user.firstName, user.secondName, user.birthDate, user.sex, user.registrationDate, user.avatarUrl);
            yield this.userRepository.store(newUser);
        });
    }
    authorization(_a) {
        return __awaiter(this, arguments, void 0, function* ({ login, password }) {
            const userData = yield this.userRepository.getByLogin(login);
            if ((userData === null || userData === void 0 ? void 0 : userData.password) !== password) {
                throw new Error('Invalid authorization data');
            }
            return (0, tokenAuthorization_1.generateTokenFromId)(userData === null || userData === void 0 ? void 0 : userData.id);
        });
    }
    changeUserData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            const userData = yield this.userRepository.getById(user === null || user === void 0 ? void 0 : user.id);
            userData.login = (_a = user.login) !== null && _a !== void 0 ? _a : userData === null || userData === void 0 ? void 0 : userData.login;
            userData.password = (_b = user.password) !== null && _b !== void 0 ? _b : userData === null || userData === void 0 ? void 0 : userData.password;
            userData.firstName = (_c = user === null || user === void 0 ? void 0 : user.firstName) !== null && _c !== void 0 ? _c : userData.firstName;
            userData.secondName = (_d = user.secondName) !== null && _d !== void 0 ? _d : userData.secondName;
            userData.sex = (_e = user.sex) !== null && _e !== void 0 ? _e : userData.sex;
            userData.birthDate = (_f = user.birthDate) !== null && _f !== void 0 ? _f : userData.birthDate;
            userData.avatarUrl = (_g = user.avatarUrl) !== null && _g !== void 0 ? _g : userData.avatarUrl;
            yield this.userRepository.store(userData);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userRepository.deleteById(id);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.UserServiceImpl = UserServiceImpl;
//# sourceMappingURL=UserServieImpl.js.map