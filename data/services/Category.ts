import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReAuth} from '../../config/serviceConfig'
import {changeToFormData} from '../../utils/functions'
import {ID, ResponseApi} from '@/interfaces/publlicInterfaces'
import {Category_PATH, USER_PATH} from '@/config/apiConfig'
import {IResultLogin, IResultRegister} from '@/interfaces/authInterfaces'
import {IResultGetProfile} from '@/interfaces/userInterfaces'
import {IResultCreateCategory, IResultGetAllCategory} from '@/interfaces/categoryInterfaces'

export const CategoryApi = createApi({
    reducerPath: 'CategoryApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Category'],

    endpoints: builder => ({
        getAllCategory: builder.query<IResultGetAllCategory, void>({
            query: () => ({
                url: `${Category_PATH}`,
                method: 'GET'
            }),
            providesTags: ['Category']
        }),
        // getToken: builder.query<IResultLogin,void >({
        //     query: () => ({
        //         url: `${USER_PATH}/token`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['Category'],
        // }),
        // registerUser: builder.mutation<IResultRegister, any>({
        //     query: body => ({
        //         url: `${USER_PATH}/register`,
        //         method: 'POST',
        //         body
        //     }),
        //     invalidatesTags: ['Category']
        // }),
        createCategory: builder.mutation<IResultCreateCategory, void>({
            query: body => ({
                url: `${Category_PATH}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Category']
        }),
        editCategory: builder.mutation<IResultCreateCategory, any>({
            query: (body) => ({
                url: `${Category_PATH}/${body._id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Category'],
        }),
        // deleteUser: builder.mutation<ResultDeleteUser, ID>({
        //     query: (body) => ({
        //         url: USER_PATH + "/" + body._id,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Category'],
        // }),
    })
})
export const {useCreateCategoryMutation, useGetAllCategoryQuery,useEditCategoryMutation} = CategoryApi
