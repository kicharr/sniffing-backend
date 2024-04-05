export interface UserDTO {
    id?: string
    firstName: string
    secondName: string
    birthDate: Date
    registrationDate?: Date
    sex: string
    avatarUrl: string
    login?: string
    password?: string
}