import { userSliceReqres } from '../userSlice'

import type { LoginPayload, UsersReqres, UserReqres } from './types'

export const extendedReqresSlice = userSliceReqres.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersReqres<UserReqres>, string | number | void>({
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ id, type: 'Users' as const })),
              { id: 'LIST', type: 'Users' },
            ]
          : [{ id: 'LIST', type: 'Users' }],
      query: (page = 1) => ({
        method: 'GET',
        url: `api/users?page=${page}`,
      }),
    }),
    login: builder.mutation<{ token: string }, Partial<LoginPayload>>({
      query: (credential) => ({
        body: { ...credential },
        method: 'POST',
        url: 'api/login',
      }),
    }),
  }),
})

export const { useLoginMutation, useGetUsersQuery } = extendedReqresSlice
