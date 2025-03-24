import { ResponseApi } from "./publlicInterfaces";


export interface ICategory {
    admin: string|{
        fullname:string
    },
    title: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}

export interface IResultCreateCategory extends ResponseApi {
    data: ICategory
}
export interface IResultGetAllCategory extends ResponseApi {
    data: ICategory[]
}