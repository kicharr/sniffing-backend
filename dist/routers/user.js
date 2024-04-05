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
const express_1 = require("express");
const User_1 = require("../controller/User");
const DependencyContainer_1 = require("../middleware/DependencyContainer");
const userRouter = (0, express_1.Router)();
// initialising the controller for an entity
const initUserController = () => {
    return new User_1.UserController(DependencyContainer_1.DependencyContainer.dependencyContainer.UserService(), DependencyContainer_1.DependencyContainer.dependencyContainer.UserQueryRepository());
};
// Methods of working on the essence
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initUserController();
    yield controller.createUser(req, res, next);
});
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initUserController();
    yield controller.authorization(req, res, next);
});
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initUserController();
    yield controller.getUserInfo(req, res, next);
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initUserController();
    yield controller.getAllUsers(req, res, next);
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initUserController();
    yield controller.updateUser(req, res, next);
});
const removeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initUserController();
    yield controller.removeUser(req, res, next);
});
// Routes on which I call methods
userRouter.post('/user', createUser);
userRouter.post('/authorization', authorization);
userRouter.get('/user/:id', getUserInfo);
userRouter.get('/users', getAllUsers);
userRouter.put('/user/:id', updateUser);
userRouter.delete('/user/:id', removeUser);
exports.default = userRouter;
//# sourceMappingURL=user.js.map