import {v4} from "uuid";

export class Article {
    private readonly _id: string
    private _title: string
    private _body: string
    private readonly _createDate: Date
    private _previewUrl: string

    constructor(title: string, body: string, creationDate: Date = new Date(), previewUrl: string, id: string = v4()) {
        this._id = id
        this._title = title
        this._body = body
        this._createDate = creationDate
        this._previewUrl = previewUrl
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


    // Setters

    set title(val: string) {
        this._title = val
    }

    set body(val: string) {
        this.body = val
    }

    set preview(val: string) {
        this._previewUrl = val
    }
}