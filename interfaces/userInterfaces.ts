import { IPost } from "./postInterfaces";
import { ResponseApi } from "./publlicInterfaces";

export interface IProfile {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    admin: boolean,
    profilePhoto: string,
    isAccountVerified: boolean,
    fullname: string,
    createdAt: string,
    updatedAt: string,
    viewedBy: IUser[],
    followers: IUser[],
    following: IUser[],
    _id:string
}

export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    profilePhoto: string,
    email: string,
    bio: string,
    isBlocked: boolean,
    isAdmin: boolean,
    isFollowing: boolean,
    isAccountVerified: boolean,
    viewedBy: IUser[],
    followers: string[],
    following: string[],
    createdAt: string,
    updatedAt: string,
    fullname: string,
    posts:IPost[]
}

export interface IResultGetProfile extends ResponseApi {
    data: IUser
}

export interface IResponseFollowAndUnfollow extends ResponseApi{
    data:IUser
}