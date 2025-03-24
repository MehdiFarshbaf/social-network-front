import {createApi} from '@reduxjs/toolkit/query/react'
import {ID, ResponseApi} from '@/interfaces/publlicInterfaces'
import {Category_PATH, Post_PATH} from '@/config/apiConfig'
import {IResultCreateCategory, IResultGetAllCategory} from '@/interfaces/categoryInterfaces'
import {baseQueryWithReAuth} from "@/config/serviceConfig";
import {changeToFormData} from "@/utils/functions";
import {IResultCreatePost} from "@/interfaces/postInterfaces";

export const PostApi = createApi({
    reducerPath: 'PostApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Post'],

    endpoints: builder => ({
        getAllPost: builder.query<IResultGetAllCategory, void>({
            query: () => ({
                url: `${Post_PATH}`,
                method: 'GET'
            }),
            providesTags: ['Post']
        }),
        createPost: builder.mutation<IResultCreatePost, void>({
            query: body => ({
                url: `${Post_PATH}`,
                method: 'Post',
                body:changeToFormData(body)
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
                url:`${Post_PATH}/${body._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    })
})
export const {useCreatePostMutation} = PostApi
