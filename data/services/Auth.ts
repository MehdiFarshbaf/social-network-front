import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '../../config/serviceConfig'
import { changeToFormData } from '../../utils/functions'
import { ID } from '@/interfaces/publlicInterfaces'
import { USER_PATH } from '@/config/apiConfig'
import { IResultLogin, IResultRegister } from '@/interfaces/authInterfaces'

export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Auth'],

    endpoints: builder => ({
        // getUsers: builder.query<IUserListApi, void>({
        //     query: () => ({
        //         url: USER_PATH,
        //         method: 'GET'
        //     }),
        //     providesTags: ['Auth']
        // }),
        getToken: builder.query<IResultLogin,void >({
            query: () => ({
                url: `${USER_PATH}/token`,
                method: 'GET',
            }),
            providesTags: ['Auth'],
        }),
        registerUser: builder.mutation<IResultRegister, any>({
            query: body => ({
                url: `${USER_PATH}/register`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Auth']
        }),
        loginUser: builder.mutation<IResultLogin, any>({
            query: body => ({
                url: `${USER_PATH}/login`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Auth']
        }),
        // editUser: builder.mutation<ResultEditUser, any>({
        //     query: (body) => ({
        //         url: USER_PATH + "/" + body._id,
        //         method: 'PUT',
        //         body: changeToFormData(body)

        //     }),
        //     invalidatesTags: ['Auth'],
        // }),
        // deleteUser: builder.mutation<ResultDeleteUser, ID>({
        //     query: (body) => ({
        //         url: USER_PATH + "/" + body._id,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Auth'],
        // }),
    })
})
export const { useRegisterUserMutation, useLoginUserMutation, useGetTokenQuery } = AuthApi
