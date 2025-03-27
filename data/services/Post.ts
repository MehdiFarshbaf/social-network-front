import { createApi } from '@reduxjs/toolkit/query/react'
import { ID, ResponseApi } from '@/interfaces/publlicInterfaces'
import { Post_PATH } from '@/config/apiConfig'
import { IResultCreateCategory } from '@/interfaces/categoryInterfaces'
import { baseQueryWithReAuth } from "@/config/serviceConfig";
import { changeToFormData } from "@/utils/functions";
import { IResponseGetAllPost, IResponseGetPost, IResultCreatePost } from "@/interfaces/postInterfaces";

export const PostApi = createApi({
    reducerPath: 'PostApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Post'],

    endpoints: builder => ({
        getAllPost: builder.query<IResponseGetAllPost, void>({
            query: () => ({
                url: `${Post_PATH}`,
                method: 'GET'
            }),
            providesTags: ['Post']
        }),
        getPost: builder.query<IResponseGetPost, ID>({
            query: body => ({
                url: `${Post_PATH}/${body._id}`,
                method: 'GET'
            }),
            providesTags: ['Post']
        }),
        createPost: builder.mutation<IResultCreatePost, void>({
            query: body => ({
                url: `${Post_PATH}`,
                method: 'Post',
                body: changeToFormData(body)
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation<IResultCreateCategory, any>({
            query: (body) => ({
                url: `${Post_PATH}/${body._id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Post'],
        }),
        deletePost: builder.mutation<ResponseApi, ID>({
            query: (body) => ({
                url: `${Post_PATH}/${body._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    })
})
export const { useCreatePostMutation, useGetAllPostQuery ,useGetPostQuery} = PostApi
