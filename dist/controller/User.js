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
const tokenAuthorization_1 = require("../lib/tokenAuthorization");
class UserController {
    constructor(userService, userQueryRepository) {
        this.userService = userService;
        this.userQueryRepository = userQueryRepository;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password, firstName, secondName, sex, birthDate, avatarUrl } = req.body;
                const newUser = {
                    login,
                    password,
                    firstName,
                    secondName,
                    sex,
                    birthDate,
                    avatarUrl,
                };
                yield this.userService.createUser(newUser);
                res.status(200).json(`User ${newUser === null || newUser === void 0 ? void 0 : newUser.firstName} successfully added!`);
            }
            catch (e) {
                next(e);
            }
        });
    }
    authorization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const token = yield this.userService.authorization({ login, password });
                res.status(200).json({ token: token });
            }
            catch (e) {
                res.status(401).json('Invalid login data');
            }
        });
    }
    getUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req === null || req === void 0 ? void 0 : req.header('X-Auth-Token');
                const userId = (0, tokenAuthorization_1.getIdFromToken)(token);
                const userData = yield this.userQueryRepository.getById(userId);
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
                const token = req === null || req === void 0 ? void 0 : req.header('X-Auth-Token');
                const userId = (0, tokenAuthorization_1.getIdFromToken)(token);
                const userData = yield this.userQueryRepository.getById(userId);
                if (!userData) {
                    return;
                }
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
                const token = req === null || req === void 0 ? void 0 : req.header('X-Auth-Token');
                const userId = (0, tokenAuthorization_1.getIdFromToken)(token);
                const userData = yield this.userQueryRepository.getById(userId);
                if (!userData) {
                    return;
                }
                const { login = null, password = null, firstName = null, secondName = null, sex = null, birthDate = null, avatarUrl = null } = req.body;
                const id = req.params.id;
                const changedUserData = {
                    id,
                    login,
                    password,
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
            var _a;
            try {
                const token = req === null || req === void 0 ? void 0 : req.header('X-Auth-Token');
                const userId = (0, tokenAuthorization_1.getIdFromToken)(token);
                yield this.userService.deleteById(userId);
                res.status(200).json(`User with id ${(_a = req.params) === null || _a === void 0 ? void 0 : _a.id}, deleted from users`);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=User.js.map