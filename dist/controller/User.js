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
exports.UserController = void 0;
class UserController {
    constructor(userService, userQueryRepository) {
        this.userService = userService;
        this.userQueryRepository = userQueryRepository;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, secondName, sex, birthDate, avatarUrl } = req.body;
                const newUser = {
                    firstName,
                    secondName,
                    sex,
                    birthDate,
                    avatarUrl
                };
                yield this.userService.createUser(newUser);
                res.status(200).json(`User ${newUser === null || newUser === void 0 ? void 0 : newUser.firstName} successfully added!`);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.userQueryRepository.getById(req.params.id);
                res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersList = yield this.userQueryRepository.getAll();
                res.status(200).json(usersList);
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName = null, secondName = null, sex = null, birthDate = null, avatarUrl = null } = req.body;
                const id = req.params.id;
                const changedUserData = {
                    id,
                    firstName,
                    secondName,
                    sex,
                    birthDate,
                    avatarUrl
                };
                yield this.userService.changeUserData(changedUserData);
                res.status(200).json(`User ${id} was successfully updated!`);
            }
            catch (e) {
                next(e);
            }
        });
    }
    removeUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                yield this.userService.deleteById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                res.status(200).json(`User with id ${(_b = req.params) === null || _b === void 0 ? void 0 : _b.id}, deleted from users`);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=User.js.map