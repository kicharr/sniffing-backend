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
const router = (0, express_1.Router)();
const initController = () => new User_1.UserController(DependencyContainer_1.DependencyContainer.dependencyContainer.UserService(), DependencyContainer_1.DependencyContainer.dependencyContainer.UserQueryRepository());
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initController();
    yield controller.createUser(req, res, next);
});
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initController();
    yield controller.getUserInfo(req, res, next);
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initController();
    yield controller.updateUser(req, res, next);
});
const removeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = initController();
    yield controller.removeUser(req, res, next);
});
router.post('/user', createUser);
router.get('/user/:id', getUserInfo);
router.put('/user/:id', updateUser);
router.delete('/user/:id', removeUser);
exports.default = router;
//# sourceMappingURL=user.js.map