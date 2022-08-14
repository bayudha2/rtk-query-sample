import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import config from '@/app/config'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL_MOVIE }),
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Discover', 'Movie', 'Genre'],
})
