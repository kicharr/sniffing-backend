"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(login, password, firstName, secondName, birthDate, sex = null, registrationDate = new Date(), avatarUrl = null, id = (0, uuid_1.v4)()) {
        this._id = id;
        this._firstName = firstName;
        this._secondName = secondName;
        this._birthDate = new Date(birthDate);
        this._registrationDate = registrationDate;
        this._sex = sex;
        this._avatarUrl = avatarUrl;
        this._login = login;
        this._password = password;
    }
    get id() {
        return this._id;
    }
    get firstName() {
        return this._firstName;
    }
    get secondName() {
        return this._secondName;
    }
    get birthDate() {
        return this._birthDate;
    }
    get registrationDate() {
        return this._registrationDate;
    }
    get sex() {
        return this._sex;
    }
    get avatarUrl() {
        return this._avatarUrl;
    }
    get login() {
        return this._login;
    }
    get password() {
        return this._password;
    }
    // Setters
    set firstName(val) {
        this._firstName = val;
    }
    set secondName(val) {
        this._secondName = val;
    }
    set birthDate(val) {
        this._birthDate = val;
    }
    set sex(val) {
        this._sex = val;
    }
    set avatarUrl(val) {
        this._avatarUrl = val;
    }
    set login(val) {
        this._login = val;
    }
    set password(val) {
        this._password = val;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map