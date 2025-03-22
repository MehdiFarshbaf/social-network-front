import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'

import { handleShowError } from '../utils/functions'
import { BASE_URL } from './apiConfig'
import Cookie from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json")
    headers.set("Authorization", `Bearer ${Cookie.get('token') ? Cookie.get('token') : ""}`)
    return headers;
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error) {
    const { data } = result.error
    handleShowError(data)
  }
  return result
}
