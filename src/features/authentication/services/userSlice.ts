import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import config from '@/app/config'
import { getToken } from '@/utils/useCookies'

// Define a service using a base URL and expected endpoints
export const userSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL_USER,
    prepareHeaders: (headers) => {
      const token = getToken()

      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({}),
  reducerPath: 'user',
  tagTypes: ['User', 'Users'],
})

export const userSliceReqres = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL_REQRES,
    prepareHeaders: (headers) => {
      const token = getToken()

      token && headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({}),
  reducerPath: 'reqres',
  tagTypes: ['Users'],
})
