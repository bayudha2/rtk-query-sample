import { userSlice } from '../userSlice'

import type { Users, ListUsersResponse, DetailUser } from './types'

export const extendedUserSlice = userSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation<DetailUser, Partial<Users>>({
      invalidatesTags: [
        { id: 'List', type: 'Users' },
        { id: 'ADD_USERS', type: 'Users' },
      ],
      query: (body) => ({ body, method: 'POST', url: 'users' }),
    }),
    deleteUser: builder.mutation<DetailUser, string | number | undefined>({
      invalidatesTags: [{ id: 'LIST', type: 'Users' }],
      query: (id) => ({
        method: 'DELETE',
        url: `users/${id}`,
      }),
    }),
    getUser: builder.query<DetailUser, string | number | undefined>({
      providesTags: (result) => [{ id: result?.id, type: 'Users' }],
      query: (id) => ({
        method: 'GET',
        url: `users/${id}`,
      }),
    }),
    getUsers: builder.query<ListUsersResponse<Users>, number | void>({
      providesTags: (result) => {
        return result
          ? [
              ...result.data.map(({ id }) => ({ id, type: 'Users' as const })),
              { id: 'LIST', type: 'Users' },
              { id: 'ADD_USERS', type: 'Users' },
            ]
          : [
              { id: 'LIST', type: 'Users' },
              { id: 'ADD_USERS', type: 'Users' },
            ]
      },
      query: (page = 1) => ({
        method: 'GET',
        url: `users?page=${page}`,
      }),
    }),
    updateUser: builder.mutation<DetailUser, Partial<Users>>({
      invalidatesTags: (result, error, arg) => [{ id: arg.id, type: 'Users' }],
      query: (body) => ({
        body,
        method: 'PUT',
        url: `users/${body.id}`,
      }),
    }),
  }),
})

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useAddUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
} = extendedUserSlice
