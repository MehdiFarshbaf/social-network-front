import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from '../../config/serviceConfig'
import { changeToFormData } from '../../utils/functions'
import { ID, ResponseApi } from '@/interfaces/publlicInterfaces'
import { USER_PATH } from '@/config/apiConfig'
import { IResultLogin, IResultRegister } from '@/interfaces/authInterfaces'
import { IResponseFollowAndUnfollow, IResultGetProfile, IResultGetUsers } from '@/interfaces/userInterfaces'

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
        getPopularUsers: builder.query<IResultGetUsers, void>({
            query: () => ({
                url: `${USER_PATH}/popular`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        getUserProfile: builder.query<IResultGetProfile, { userId: string }>({
            query: (body) => ({
                url: `${USER_PATH}/profile/${body.userId}`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        getUsers: builder.query<IResultGetUsers, void>({
            query: () => ({
                url: `${USER_PATH}`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        followUser: builder.mutation<IResponseFollowAndUnfollow, { followId: string }>({
            query: (body) => ({
                url: `${USER_PATH}/follow`,
                method: 'PUT',
                body

            }),
            invalidatesTags: ['User'],
        }),
        unFollowUser: builder.mutation<IResponseFollowAndUnfollow, { unFollowId: string }>({
            query: (body) => ({
                url: `${USER_PATH}/unfollow`,
                method: 'PUT',
                body

            }),
            invalidatesTags: ['User'],
        }),
        changeProfileImage: builder.mutation<ResponseApi, any>({
            query: (body) => ({
                url: USER_PATH + "/change-image-profile",
                method: 'PUT',
                body: changeToFormData(body)

            }),
            invalidatesTags: ['User'],
        }),
        editProfile: builder.mutation<ResponseApi, any>({
            query: (body) => ({
                url: `${USER_PATH}/${body.userId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['User'],
        }),
        checkOTP: builder.mutation<ResponseApi, void>({
            query: body => ({
                url: `/check-otp`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['User']
        }),
        blockUser: builder.mutation<ResponseApi, {user_id:string}>({
            query: (body) => ({
                url: USER_PATH + "/block/" + body.user_id,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        unblockUser: builder.mutation<ResponseApi, {user_id:string}>({
            query: (body) => ({
                url: USER_PATH + "/unblock/" + body.user_id,
                method: 'PUT',
            }),
            invalidatesTags: ['User'],
        }),
        updatePassword: builder.mutation<ResponseApi, {password:string}>({
            query: (body) => ({
                url: USER_PATH + "/update-password",
                method: 'PUT',
                body
            }),
            invalidatesTags: ['User'],
        }),
    })
})
export const {
    useUnFollowUserMutation,
    useFollowUserMutation,
    useEditProfileMutation,
    useGetProfileQuery,
    useGetUserProfileQuery,
    useChangeProfileImageMutation,
    useCheckOTPMutation,
    useGetUsersQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
    useUpdatePasswordMutation,
    useGetPopularUsersQuery
} = UserApi
