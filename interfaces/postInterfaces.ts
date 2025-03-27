import { ResponseApi } from "@/interfaces/publlicInterfaces";
import { ICategory } from "@/interfaces/categoryInterfaces";
import { IUser } from "@/interfaces/userInterfaces";

export interface IResultCreatePost extends ResponseApi {

}

export interface IPost {
    _id: string,
    title: string,
    category_id: string,
    numberViews: number,
    likes: [],
    disLikes: [],
    user: IUser,
    description: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    category: ICategory,
}

export interface IResponseGetAllPost extends ResponseApi {
    data: IPost[]
}

export interface IResponseGetPost extends ResponseApi {
    data: IPost
}