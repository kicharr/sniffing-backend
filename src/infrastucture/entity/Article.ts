import {v4} from "uuid";
import {User} from "./User";

export class Article {
    private readonly _id: string
    private _title: string
    private _body: string
    private readonly _createDate: Date
    private _previewUrl: string;
    private readonly _author: User;

    constructor(title: string, body: string, previewUrl: string, author: User, creationDate: Date = new Date(), id: string = v4()) {
        this._id = id
        this._title = title
        this._body = body
        this._createDate = creationDate
        this._previewUrl = previewUrl;
        this._author = author;
    }

    get id(): string {
        return this._id
    }

    get title(): string {
        return this._title
    }

    get body(): string {
        return this._body
    }

    get creationDate(): Date {
        return this._createDate
    }

    get preview(): string {
        return this._previewUrl
    }

    get author(): User {
        return this._author;
    }


    // Setters

    set title(val: string) {
        this._title = val
    }

    set body(val: string) {
        this._body = val
    }

    set preview(val: string) {
        this._previewUrl = val
    }
}