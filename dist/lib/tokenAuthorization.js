"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromToken = exports.generateTokenFromId = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const appConfig_1 = require("./appConfig");
function generateTokenFromId(id) {
    try {
        return (0, jsonwebtoken_1.sign)(id, appConfig_1.appConfig.secretKey);
    }
    catch (e) {
        throw e;
    }
}
exports.generateTokenFromId = generateTokenFromId;
function getIdFromToken(token) {
    try {
        return (0, jsonwebtoken_1.verify)(token, appConfig_1.appConfig.secretKey);
    }
    catch (e) {
        throw e;
    }
}
exports.getIdFromToken = getIdFromToken;
//# sourceMappingURL=tokenAuthorization.js.map