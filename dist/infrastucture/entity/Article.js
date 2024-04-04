"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const uuid_1 = require("uuid");
class Article {
    constructor(title, body, previewUrl, author, creationDate = new Date(), id = (0, uuid_1.v4)()) {
        this._id = id;
        this._title = title;
        this._body = body;
        this._createDate = creationDate;
        this._previewUrl = previewUrl;
        this._author = author;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get body() {
        return this._body;
    }
    get creationDate() {
        return this._createDate;
    }
    get preview() {
        return this._previewUrl;
    }
    get author() {
        return this._author;
    }
    // Setters
    set title(val) {
        this._title = val;
    }
    set body(val) {
        this._body = val;
    }
    set preview(val) {
        this._previewUrl = val;
    }
}
exports.Article = Article;
//# sourceMappingURL=Article.js.map