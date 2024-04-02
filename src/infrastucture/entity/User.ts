import {v4} from "uuid";

export class User {
    private readonly _id: string
    private _firstName: string
    private _secondName: string
    private _birthDate: Date
    private readonly _registrationDate: Date
    private _sex: string
    private _avatarUrl: string

    constructor(firstName: string, secondName: string, birthDate: Date, sex: string = null, registrationDate: Date = new Date(), avatarUrl: string = null, id: string = v4()) {
        this._id = id
        this._firstName = firstName
        this._secondName = secondName
        this._birthDate = new Date(birthDate)
        this._registrationDate = registrationDate
        this._sex = sex
        this._avatarUrl = avatarUrl
    }

    get id(): string {
        return this._id
    }

    get firstName(): string {
        return this._firstName
    }

    get secondName(): string {
        return this._secondName
    }

    get birthDate(): Date {
        return this._birthDate
    }

    get registrationDate(): Date {
        return this._registrationDate
    }

    get sex(): string {
        return this._sex
    }

    get avatarUrl(): string {
        return this._avatarUrl
    }

    // Setters

    set firstName(val: string) {
        this._firstName = val
    }

    set secondName(val: string) {
        this._secondName = val
    }

    set birthDate(val: Date) {
        this._birthDate = val
    }

    set sex(val: string) {
        this._sex = val
    }

    set avatarUrl(val: string) {
        this._avatarUrl = val
    }


}