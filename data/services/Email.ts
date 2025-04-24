import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReAuth} from '../../config/serviceConfig'
import {ID, ResponseApi} from '@/interfaces/publlicInterfaces'
import { EMAIL_PATH} from '@/config/apiConfig'
import {IResultCreateCategory, IResultGetAllCategory} from '@/interfaces/categoryInterfaces'

export const EmailApi = createApi({
    reducerPath: 'EmailApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Email'],

    endpoints: builder => ({
        // getAllCategory: builder.query<IResultGetAllCategory, void>({
        //     query: () => ({
        //         url: `${Category_PATH}`,
        //         method: 'GET'
        //     }),
        //     providesTags: ['Category']
        // }),
        sendEmail: builder.mutation<ResponseApi, any>({
            query: body => ({
                url: `${EMAIL_PATH}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Email']
        }),
        sendOTP: builder.mutation<ResponseApi, void>({
            query: body => ({
                url: `/send-otp`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Email']
        }),
      
        // editCategory: builder.mutation<IResultCreateCategory, any>({
        //     query: (body) => ({
        //         url: `${Category_PATH}/${body._id}`,
        //         method: 'PUT',
        //         body
        //     }),
        //     invalidatesTags: ['Category'],
        // }),
        // deleteCategory: builder.mutation<ResponseApi, ID>({
        //     query: (body) => ({
        //         url:`${Category_PATH}/${body._id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Category'],
        // }),
    })
})
export const {useSendEmailMutation,useSendOTPMutation} = EmailApi
