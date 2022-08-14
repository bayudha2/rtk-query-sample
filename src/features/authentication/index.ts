import ListUser from './components/ListUser'
import LoginForm from './components/LoginForm'
import ModalForm from './components/ModalForm'
import SignupForm from './components/SignupForm'
import type { Users, UserReqres } from './services/api/types'
import {
  useLoginMutation,
  useSignupMutation,
} from './services/api/userAuthSlice'
import {
  useLoginMutation as useLoginReqresMutation,
  useGetUsersQuery as useGetUsersReqresQuery,
} from './services/api/userReqres'
import {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useAddUserMutation,
} from './services/api/usersSlice'

export type { Users, UserReqres }

export {
  LoginForm,
  SignupForm,
  ModalForm,
  ListUser,
  useLoginMutation,
  useSignupMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useGetUsersReqresQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useLoginReqresMutation,
}
