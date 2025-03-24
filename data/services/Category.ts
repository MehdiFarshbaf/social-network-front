import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReAuth} from '../../config/serviceConfig'
import {ID, ResponseApi} from '@/interfaces/publlicInterfaces'
import {Category_PATH} from '@/config/apiConfig'
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
        deleteCategory: builder.mutation<ResponseApi, ID>({
            query: (body) => ({
                url:`${Category_PATH}/${body._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    })
})
export const {useCreateCategoryMutation, useGetAllCategoryQuery,useEditCategoryMutation,useDeleteCategoryMutation} = CategoryApi
