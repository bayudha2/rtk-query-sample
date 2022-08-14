import { userSlice } from '../userSlice'

import type { Login, LoginPayload, Signup, SignupPayload } from './types'

export const extendedAuthSlice = userSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Login, Partial<LoginPayload>>({
      query: (credential) => ({
        body: { ...credential },
        method: 'POST',
        url: 'authaccount/login',
        validateStatus: (response, result) =>
          response.status === 200 && result.code !== 1,
      }),
    }),
    signup: builder.mutation<Signup, Partial<SignupPayload>>({
      query: (credential) => ({
        body: { ...credential },
        method: 'POST',
        url: 'authaccount/registration',
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = extendedAuthSlice
