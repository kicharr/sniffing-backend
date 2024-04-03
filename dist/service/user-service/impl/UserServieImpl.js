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
const User_1 = require("../../../infrastucture/entity/User");
class UserServiceImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.User(user.firstName, user.secondName, user.birthDate, user.sex, user.registrationDate, user.avatarUrl);
            yield this.userRepository.store(newUser);
        });
    }
    changeUserData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const userData = yield this.userRepository.getById(user === null || user === void 0 ? void 0 : user.id);
            userData.firstName = (_a = user === null || user === void 0 ? void 0 : user.firstName) !== null && _a !== void 0 ? _a : userData.firstName;
            userData.secondName = (_b = user.secondName) !== null && _b !== void 0 ? _b : userData.secondName;
            userData.sex = (_c = user.sex) !== null && _c !== void 0 ? _c : userData.sex;
            userData.birthDate = (_d = user.birthDate) !== null && _d !== void 0 ? _d : userData.birthDate;
            userData.avatarUrl = (_e = user.avatarUrl) !== null && _e !== void 0 ? _e : userData.avatarUrl;
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