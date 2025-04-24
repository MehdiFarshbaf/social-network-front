import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReAuth} from '../../config/serviceConfig'
import {changeToFormData} from '../../utils/functions'
import {ID, ResponseApi} from '@/interfaces/publlicInterfaces'
import {USER_PATH} from '@/config/apiConfig'
import {IResultLogin, IResultRegister} from '@/interfaces/authInterfaces'
import {IResponseFollowAndUnfollow, IResultGetProfile} from '@/interfaces/userInterfaces'

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
        getUserProfile: builder.query<IResultGetProfile, { userId: string }>({
            query: (body) => ({
                url: `${USER_PATH}/profile/${body.userId}`,
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
        // deleteUser: builder.mutation<ResultDeleteUser, ID>({
        //     query: (body) => ({
        //         url: USER_PATH + "/" + body._id,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['User'],
        // }),
    })
})
export const {
    useUnFollowUserMutation,
    useFollowUserMutation,
    useEditProfileMutation,
    useGetProfileQuery,
    useGetUserProfileQuery,
    useChangeProfileImageMutation,
    useCheckOTPMutation
} = UserApi
