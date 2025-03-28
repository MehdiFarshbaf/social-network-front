import { createApi } from '@reduxjs/toolkit/query/react'
import { ID, ResponseApi } from '@/interfaces/publlicInterfaces'
import { Comment_PATH, Post_PATH } from '@/config/apiConfig'
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
        addComment: builder.mutation<ResponseApi, { postId: string, message: string }>({
            query: body => ({
                url: `${Comment_PATH}/${body.postId}`,
                method: 'Post',
                body
            }),
            invalidatesTags: ['Post']
        }),
        editComment: builder.mutation<ResponseApi, { commentId: string, message: string }>({
            query: body => ({
                url: `${Comment_PATH}/${body.commentId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Post']
        }),
        deleteComment: builder.mutation<ResponseApi, { commentId: string }>({
            query: body => ({
                url: `${Comment_PATH}/${body.commentId}`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation<IResponseGetPost, any>({
            query: (body) => ({
                url: `${Post_PATH}/${body._id}`,
                method: 'PUT',
                body: changeToFormData(body)
            }),
            invalidatesTags: ['Post'],
        }),
        likePost: builder.mutation<ResponseApi, ID>({
            query: (body) => ({
                url: `${Post_PATH}/like/${body._id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Post'],
        }),
        dislikePost: builder.mutation<ResponseApi, ID>({
            query: (body) => ({
                url: `${Post_PATH}/dislike/${body._id}`,
                method: 'PUT',
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
export const { useEditCommentMutation, useDeleteCommentMutation, useAddCommentMutation, useCreatePostMutation, useGetAllPostQuery, useGetPostQuery, useEditPostMutation, useDeletePostMutation, useLikePostMutation, useDislikePostMutation } = PostApi
