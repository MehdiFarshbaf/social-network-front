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

export interface IUser{
    _id:string,
    firstName: string,
    lastName: string,
    profilePhoto: string,
    email: string,
    bio: string,
    isBlocked: boolean,
    isAdmin: boolean,
    isFollowing: boolean,
    isAccountVerified: boolean,
    viewedBy: [],
    followers: [],
    following: [],
    createdAt: string,
    updatedAt: string,
    fullname: string,
}

export interface IResultGetProfile extends ResponseApi {
    data: IProfile
}