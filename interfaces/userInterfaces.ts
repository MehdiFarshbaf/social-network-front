import { ResponseApi } from "./publlicInterfaces";

export interface IProfile {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    admin: boolean,
    profilePhoto: string,
    isAccountVerified: boolean,
    fullname: string
}

export interface IResultGetProfile extends ResponseApi {
    data: IProfile
}