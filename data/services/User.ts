import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '../../config/serviceConfig'
import { changeToFormData } from '../../utils/functions'
import { ID } from '@/interfaces/publlicInterfaces'
import { USER_PATH } from '@/config/apiConfig'
import { IResultLogin, IResultRegister } from '@/interfaces/authInterfaces'
import { IResultGetProfile } from '@/interfaces/userInterfaces'

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['User'],

    endpoints: builder => ({
        getProfile: builder.query<IResultGetProfile, any>({
            query: () => ({
                url: `${USER_PATH}/my-profile`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        // getToken: builder.query<IResultLogin,void >({
        //     query: () => ({
        //         url: `${USER_PATH}/token`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['User'],
        // }),
        // registerUser: builder.mutation<IResultRegister, any>({
        //     query: body => ({
        //         url: `${USER_PATH}/register`,
        //         method: 'POST',
        //         body
        //     }),
        //     invalidatesTags: ['User']
        // }),
        // loginUser: builder.mutation<IResultLogin, any>({
        //     query: body => ({
        //         url: `${USER_PATH}/login`,
        //         method: 'POST',
        //         body
        //     }),
        //     invalidatesTags: ['User']
        // }),
        // editUser: builder.mutation<ResultEditUser, any>({
        //     query: (body) => ({
        //         url: USER_PATH + "/" + body._id,
        //         method: 'PUT',
        //         body: changeToFormData(body)

        //     }),
        //     invalidatesTags: ['User'],
        // }),
        // deleteUser: builder.mutation<ResultDeleteUser, ID>({
        //     query: (body) => ({
        //         url: USER_PATH + "/" + body._id,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['User'],
        // }),
    })
})
export const { useGetProfileQuery } = UserApi
